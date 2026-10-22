/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  Gamepad2, 
  Flame, 
  Timer, 
  ArrowRight, 
  Leaf, 
  Trash2, 
  Package, 
  Box, 
  Apple, 
  Cpu, 
  Hammer,
  Trophy
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Que doit-on faire avec une bouteille en plastique (PET) avant de la jeter à Abidjan ?",
    options: [
      "La laver longuement avec du savon et de l'eau tiède",
      "La vider entièrement et laisser son bouchon vissé dessus",
      "La découper en petits morceaux aux ciseaux",
      "La brûler dans la cour pour réduire son volume",
    ],
    correctIndex: 1,
    explanation:
      "Exact ! Il suffit de bien la vider. Laissez le bouchon vissé car les bouchons en PEHD sont recyclés en nouvelles pièces plastiques.",
  },
  {
    id: 2,
    question: "Pourquoi est-il crucial de ne jamais jeter de plastiques dans les caniveaux d'Abidjan ?",
    options: [
      "Cela attire les oiseaux migrateurs sur la route",
      "Cela obstrue les canaux et engendre de graves inondations en saison des pluies",
      "Cela use trop rapidement les pneus des taxis wôrô-wôrô",
      "Le plastique s'évapore avec la chaleur",
    ],
    correctIndex: 1,
    explanation:
      "Bravo ! Les déchets plastiques jetés dans les caniveaux bouchent les réseaux d'évacuation, inondent les quartiers de Cocody et Yopougon et polluent la Lagune Ébrié.",
  },
  {
    id: 3,
    question: "Quelle agence nationale supervise la salubrité et la traçabilité des déchets en Côte d'Ivoire ?",
    options: [
      "La CIE (Compagnie Ivoirienne d'Électricité)",
      "L'ANAGED (Agence Nationale de Gestion des Déchets)",
      "La SODECI (Distribution d'eau)",
      "Le Port Autonome de San Pedro",
    ],
    correctIndex: 1,
    explanation:
      "Correct ! L'ANAGED est l'agence de référence qui régule les filières de collecte, le tri et la salubrité publique sur l'ensemble du territoire ivoirien.",
  },
  {
    id: 4,
    question: "Que deviennent les épluchures de manioc, bananes et restes de maquis collectés par les filières vertes ?",
    options: [
      "Ils sont déversés dans la baie de Cocody",
      "Ils sont transformés en compost fertile pour l'agriculture ou méthanisés en biogaz",
      "Ils sont incinérés à ciel ouvert sur les trottoirs",
      "Ils sont abandonnés sans traitement",
    ],
    correctIndex: 1,
    explanation:
      "Très bien ! Les matières organiques sont valorisées à 100% en engrais naturel pour les plantations de Songon et maraîchers d'Abidjan.",
  },
  {
    id: 5,
    question: "Quel est le principe fondamental de l'Économie Circulaire ?",
    options: [
      "Extraire, fabriquer, consommer puis jeter le plus vite possible",
      "Réduire, réemployer, réparer et recycler pour que le déchet devienne une ressource",
      "N'utiliser que des emballages à usage unique jetables",
      "Transporter les ordures ménagères vers les pays voisins",
    ],
    correctIndex: 1,
    explanation:
      "Excellent ! L'économie circulaire ferme la boucle : les sous-produits d'une entreprise ou d'un ménage deviennent la matière première d'un autre acteur.",
  },
];

interface SortGameObject {
  id: string;
  name: string;
  icon: any;
  correctBin: 'jaune' | 'bleu' | 'marron' | 'gris';
  fact: string;
}

const SORT_GAME_OBJECTS: SortGameObject[] = [
  {
    id: 'obj-1',
    name: "Bouteille d'eau minérale (PET)",
    icon: Package,
    correctBin: 'jaune',
    fact: "Refilée en nouvelles bouteilles ou fibres textiles locales.",
  },
  {
    id: 'obj-2',
    name: "Carton d'emballage livraison",
    icon: Box,
    correctBin: 'bleu',
    fact: "Défibré en pâte à papier pour fabriquer des caisses recyclées.",
  },
  {
    id: 'obj-3',
    name: "Épluchures d'igname & manioc",
    icon: Apple,
    correctBin: 'marron',
    fact: "Compost riche pour enrichir les sols agricoles périurbains.",
  },
  {
    id: 'obj-4',
    name: "Canette de soda en aluminium",
    icon: Hammer,
    correctBin: 'gris',
    fact: "Fondue et recyclable à 100% à l'infini sans perte mécanique.",
  },
  {
    id: 'obj-5',
    name: "Film plastique étirable de palette",
    icon: Package,
    correctBin: 'jaune',
    fact: "Régénéré en granulés plastiques pour pavés écologiques et bâches.",
  },
  {
    id: 'obj-6',
    name: "Vieux smartphone & batterie cassée",
    icon: Cpu,
    correctBin: 'gris',
    fact: "Filière DEEE sécurisée : neutralisation du lithium et recyclage métaux nobles.",
  },
  {
    id: 'obj-7',
    name: "Archives & papiers de bureau",
    icon: Box,
    correctBin: 'bleu',
    fact: "Broyage sécurisé et réintégration dans la filière papetière.",
  },
  {
    id: 'obj-8',
    name: "Marc de café & coquilles d'œufs",
    icon: Apple,
    correctBin: 'marron',
    fact: "Excellent activateur de compost riche en azote et minéraux.",
  },
];

export const EcoQuizAndGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'game'>('quiz');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Game state
  const [gameObjectIndex, setGameObjectIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastGameFeedback, setLastGameFeedback] = useState<{
    correct: boolean;
    text: string;
  } | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  // Quiz handlers
  const handleSelectQuizOption = (index: number) => {
    if (selectedAnswer !== null) return; // already answered this question
    setSelectedAnswer(index);
    if (index === QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
      setQuizScore((s) => s + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex((i) => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  // Game handlers
  const handleSortObject = (chosenBin: 'jaune' | 'bleu' | 'marron' | 'gris') => {
    const currentObj = SORT_GAME_OBJECTS[gameObjectIndex];
    const isCorrect = chosenBin === currentObj.correctBin;

    if (isCorrect) {
      setGameScore((s) => s + 10 + streak * 2);
      setStreak((st) => st + 1);
      setLastGameFeedback({
        correct: true,
        text: `Parfait ! ${currentObj.name} : ${currentObj.fact}`,
      });
    } else {
      setStreak(0);
      setLastGameFeedback({
        correct: false,
        text: `Oups ! ${currentObj.name} devait aller dans le ${
          currentObj.correctBin === 'jaune'
            ? 'Bac Jaune (Plastiques)'
            : currentObj.correctBin === 'bleu'
            ? 'Bac Bleu (Cartons/Papiers)'
            : currentObj.correctBin === 'marron'
            ? 'Abri-Bac Marron (Biodéchets)'
            : 'Bac Gris/DEEE (Métal/Électronique)'
        }.`,
      });
    }

    setTimeout(() => {
      if (gameObjectIndex + 1 < SORT_GAME_OBJECTS.length) {
        setGameObjectIndex((i) => i + 1);
        setLastGameFeedback(null);
      } else {
        setIsGameFinished(true);
      }
    }, 1200);
  };

  const handleRestartGame = () => {
    setGameObjectIndex(0);
    setGameScore(0);
    setStreak(0);
    setLastGameFeedback(null);
    setIsGameFinished(false);
  };

  const currentQuiz = QUIZ_QUESTIONS[currentQuizIndex];
  const currentGameObject = SORT_GAME_OBJECTS[gameObjectIndex];

  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-green-950 text-white rounded-3xl p-6 sm:p-10 border border-lime-400/30 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Decorative ambient gradients with tri-green */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header and Mode Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-lime-400/20 to-green-400/20 text-lime-300 border border-lime-400/40 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Espace Ludique & Pédagogique EcoAct
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Jeux & Quiz du Recyclage à Abidjan
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Testez vos réflexes écologiques, validez les leçons apprises sur l'économie verte et devenez un champion du tri dans votre commune !
          </p>
        </div>

        {/* Tab Buttons (Quiz vs Jeu) */}
        <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-lime-400/30 shrink-0 shadow-inner">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-lime-300" />
            <span>Grand Éco-Quiz (5 Qs)</span>
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'game'
                ? 'bg-gradient-to-r from-green-600 to-lime-500 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Mini-Jeu : Le Tri Chrono</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ÉCO-QUIZ INTERACTIF */}
      {activeTab === 'quiz' && (
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          {!isQuizFinished ? (
            <>
              {/* Quiz progress indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-lime-300">
                  <span>Question {currentQuizIndex + 1} sur {QUIZ_QUESTIONS.length}</span>
                  <span className="text-emerald-300">Score actuel : {quizScore} point{quizScore > 1 ? 's' : ''}</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-400 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-lime-400">
                  Leçon Économie Verte & Salubrité
                </span>
                <h4 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                  {currentQuiz.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQuiz.options.map((option, idx) => {
                  const isAnswered = selectedAnswer !== null;
                  const isSelected = selectedAnswer === idx;
                  const isCorrectOption = idx === currentQuiz.correctIndex;

                  let buttonStyle = 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700/80 hover:border-lime-400/50';

                  if (isAnswered) {
                    if (isCorrectOption) {
                      buttonStyle = 'bg-green-600/90 border-lime-400 text-white font-bold shadow-lg shadow-green-900/50';
                    } else if (isSelected) {
                      buttonStyle = 'bg-red-600/80 border-red-400 text-white font-bold';
                    } else {
                      buttonStyle = 'bg-slate-800/40 border-slate-700 text-slate-500 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={isAnswered}
                      className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-start gap-3 ${buttonStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-black/30 border border-white/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-lime-300 shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {selectedAnswer !== null && (
                <div className="p-4 rounded-2xl bg-slate-800/90 border border-lime-400/40 animate-in fade-in slide-in-from-bottom-2 space-y-3">
                  <div className="flex items-start gap-2.5">
                    {selectedAnswer === currentQuiz.correctIndex ? (
                      <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-xs font-bold block mb-0.5 text-lime-300">
                        {selectedAnswer === currentQuiz.correctIndex ? 'Excellente réponse !' : 'Explication :'}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {currentQuiz.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleNextQuizQuestion}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 hover:scale-102 transition-transform shadow-md"
                    >
                      <span>{currentQuizIndex + 1 < QUIZ_QUESTIONS.length ? 'Question suivante' : 'Voir mon résultat'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-green-900/40">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/30">
                  Quiz Terminé avec succès !
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Votre Score : {quizScore} / {QUIZ_QUESTIONS.length}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto pt-1">
                  {quizScore === 5
                    ? "Félicitations ! Vous êtes un véritable Maître de l'Économie Verte et du Recyclage à Abidjan !"
                    : quizScore >= 3
                    ? "Bravo ! Vous maîtrisez les principes clés du tri et de la salubrité pour préserver la Lagune Ébrié."
                    : "Bel essai ! Révisez les 5 piliers de l'économie circulaire ci-dessus et retentez votre chance !"}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Recommencer le quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MINI-JEU DU TRI CHRONO D'ABIDJAN */}
      {activeTab === 'game' && (
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
          {!isGameFinished ? (
            <>
              {/* Score and Streak Bar */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Objet {gameObjectIndex + 1} / {SORT_GAME_OBJECTS.length}</span>
                  {streak > 1 && (
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full text-[11px] animate-pulse">
                      <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      Combo x{streak} !
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-lime-400 text-sm font-black">
                  <Award className="w-4 h-4" />
                  <span>{gameScore} points</span>
                </div>
              </div>

              {/* The Target Object Card to Sort */}
              <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border-2 border-lime-400/40 text-center space-y-3 shadow-xl">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Quel est le bon bac pour cet objet ?
                </span>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-600 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                  {React.createElement(currentGameObject.icon, { className: 'w-8 h-8' })}
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-white">
                  {currentGameObject.name}
                </h4>

                <p className="text-xs text-slate-400">
                  Cliquez sur le bac correspondant ci-dessous pour trier correctement.
                </p>
              </div>

              {/* Immediate Feedback Notice */}
              {lastGameFeedback && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold text-center border animate-in zoom-in-95 ${
                    lastGameFeedback.correct
                      ? 'bg-green-500/20 border-green-500/50 text-lime-300'
                      : 'bg-red-500/20 border-red-500/50 text-red-300'
                  }`}
                >
                  {lastGameFeedback.text}
                </div>
              )}

              {/* The 4 Bins Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {/* 1. Bac Jaune: Plastiques */}
                <button
                  onClick={() => handleSortObject('jaune')}
                  className="p-4 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border-2 border-amber-400/60 text-amber-300 hover:scale-103 transition-all flex flex-col items-center gap-2 group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black group-hover:rotate-6 transition-transform">
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black">Bac Jaune</span>
                  <span className="text-[10px] text-amber-200/80">Plastiques & Sachets</span>
                </button>

                {/* 2. Bac Bleu: Cartons & Papier */}
                <button
                  onClick={() => handleSortObject('bleu')}
                  className="p-4 rounded-2xl bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-400/60 text-blue-300 hover:scale-103 transition-all flex flex-col items-center gap-2 group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black group-hover:rotate-6 transition-transform">
                    <Box className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black">Bac Bleu</span>
                  <span className="text-[10px] text-blue-200/80">Cartons & Papiers</span>
                </button>

                {/* 3. Abri-Bac Marron: Biodéchets */}
                <button
                  onClick={() => handleSortObject('marron')}
                  className="p-4 rounded-2xl bg-amber-900/40 hover:bg-amber-900/60 border-2 border-amber-700/80 text-amber-200 hover:scale-103 transition-all flex flex-col items-center gap-2 group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-black group-hover:rotate-6 transition-transform">
                    <Apple className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black">Abri-Bac Marron</span>
                  <span className="text-[10px] text-amber-300/80">Biodéchets & Maquis</span>
                </button>

                {/* 4. Bac Gris/Spécial: Métal & DEEE */}
                <button
                  onClick={() => handleSortObject('gris')}
                  className="p-4 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border-2 border-purple-400/60 text-purple-300 hover:scale-103 transition-all flex flex-col items-center gap-2 group text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black group-hover:rotate-6 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black">Bac Spécial</span>
                  <span className="text-[10px] text-purple-200/80">Métal & Informatique</span>
                </button>
              </div>
            </>
          ) : (
            /* Game Finished View */
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-lime-400 to-green-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-green-900/40">
                <Gamepad2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-lime-400 bg-lime-400/10 px-3 py-1 rounded-full border border-lime-400/30">
                  Partie terminée !
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Score Final : {gameScore} Points
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto pt-1">
                  Grâce à vos réflexes, ces déchets seront transformés en nouvelles ressources locales pour Abidjan !
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRestartGame}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-black text-sm inline-flex items-center gap-2 hover:scale-103 transition-transform shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Rejouer une partie</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

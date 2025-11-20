import React, { useState } from 'react';
import { 
  Moon, 
  Sun, 
  Battery, 
  Brain, 
  Heart, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Smartphone, 
  Coffee,
  Clock,
  ShieldCheck,
  TrendingUp,
  BookOpen
} from 'lucide-react';

// --- Components ---

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-3">{title}</h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; text: string; color?: string }> = ({ icon, title, text, color = "bg-slate-800" }) => (
  <div className={`${color} p-6 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 shadow-lg h-full`}>
    <div className="mb-4 text-teal-400">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-slate-100">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
  </div>
);

// --- Quiz Data based on Page 23 of PDF ---
const quizQuestions = [
  {
    question: "Οι έφηβοι χρειάζονται 8 έως 10 ώρες ύπνου τη νύχτα.",
    isCorrect: true,
    explanation: "Σωστό. Αυτή είναι η συνιστώμενη διάρκεια για την υγιή ανάπτυξη."
  },
  {
    question: "Δεν πειράζει να ξενυχτάμε όταν έχουμε σχολείο, αρκεί να κοιμόμαστε τα Σαββατοκύριακα.",
    isCorrect: false,
    explanation: "Λάθος. Η σταθερότητα στον ύπνο είναι σημαντική για το βιολογικό ρολόι."
  },
  {
    question: "Η έλλειψη ύπνου μπορεί να οδηγήσει σε δυσκολία διαχείρισης συναισθημάτων.",
    isCorrect: true,
    explanation: "Σωστό. Ο ύπνος επηρεάζει άμεσα την ψυχική μας ισορροπία."
  },
  {
    question: "Τα ενεργειακά ποτά είναι καλή επιλογή για να μείνουμε ξύπνιοι για διάβασμα.",
    isCorrect: false,
    explanation: "Λάθος. Η καφεΐνη και η ζάχαρη διαταράσσουν την ποιότητα του ύπνου."
  },
  {
    question: "Ο ύπνος βοηθά στην ενίσχυση της μνήμης και της μάθησης.",
    isCorrect: true,
    explanation: "Σωστό. Κατά τον ύπνο ο εγκέφαλος επεξεργάζεται και αποθηκεύει πληροφορίες."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === quizQuestions[currentQuestion].isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
      <h3 className="text-2xl font-bold text-center mb-6 text-white">Κουίζ Γνώσεων: Ύπνος & Εφηβεία</h3>
      
      {showScore ? (
        <div className="text-center">
          <p className="text-4xl font-bold text-teal-400 mb-4">{score} / {quizQuestions.length}</p>
          <p className="text-slate-300 mb-6">
            {score === quizQuestions.length ? "Άριστα! Γνωρίζεις καλά τα οφέλη του ύπνου." : "Μπορείς να τα πας και καλύτερα!"}
          </p>
          <button 
            onClick={resetQuiz}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors"
          >
            Προσπάθησε ξανά
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between text-sm text-slate-400">
            <span>Ερώτηση {currentQuestion + 1}/{quizQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl mb-6 min-h-[100px] flex items-center justify-center">
            <p className="text-lg text-center font-medium text-white">{quizQuestions[currentQuestion].question}</p>
          </div>
          
          {!showExplanation ? (
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleAnswer(true)}
                className="py-4 bg-emerald-600/20 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white text-emerald-400 rounded-xl font-bold transition-all"
              >
                Σωστό
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className="py-4 bg-rose-600/20 border border-rose-500/50 hover:bg-rose-600 hover:text-white text-rose-400 rounded-xl font-bold transition-all"
              >
                Λάθος
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className={`p-4 rounded-lg mb-4 text-center ${selectedAnswer === quizQuestions[currentQuestion].isCorrect ? 'bg-emerald-900/50 text-emerald-200' : 'bg-rose-900/50 text-rose-200'}`}>
                {selectedAnswer === quizQuestions[currentQuestion].isCorrect ? "Σωστά!" : "Λάθος!"}
                <p className="mt-2 text-sm opacity-90">{quizQuestions[currentQuestion].explanation}</p>
              </div>
              <button 
                onClick={nextQuestion}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
              >
                {currentQuestion < quizQuestions.length - 1 ? "Επόμενη Ερώτηση" : "Δες το αποτέλεσμα"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-teal-500/30">
      
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-indigo-950 to-slate-900">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-2 px-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Moon className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-indigo-300 text-sm font-medium uppercase tracking-wider">Αγωγή Υγείας - Β' Γυμνασίου</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200 mb-6 leading-tight">
            Ύπνος και Εφηβεία
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
            Ο ύπνος είναι θεμέλιο για την υγεία, την ανάπτυξη και την ευεξία. 
            Ανακαλύψτε γιατί είναι τόσο σημαντικός κατά την περίοδο της εφηβείας.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-24">
        
        {/* Section 1: Biological Clock */}
        <section>
          <SectionHeader 
            title="Ο Βιολογικός Ρυθμός & Η Μελατονίνη" 
            subtitle="Πώς λειτουργεί το εσωτερικό μας ρολόι και γιατί νυστάζουμε;"
          />
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Sun className="w-6 h-6 text-yellow-400 mr-3" />
                Κιρκάδιος Ρυθμός
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Είναι το βιολογικό μας ρολόι που ρυθμίζει πότε ξυπνάμε και πότε κοιμόμαστε. 
                Επηρεάζει τη θερμοκρασία του σώματος, τις ορμόνες και τη διάθεση.
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-slate-400">
                  <strong>Tip:</strong> Η σταθερότητα στο ωράριο ύπνου βοηθά στη ρύθμιση του!
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Moon className="w-6 h-6 text-indigo-400 mr-3" />
                Μελατονίνη
              </h3>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Η ορμόνη του ύπνου. Η έκκρισή της ξεκινά όταν νυχτώνει, βοηθώντας το σώμα να χαλαρώσει.
                Το φως (ειδικά από οθόνες) μειώνει την παραγωγή της.
              </p>
              <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-indigo-500">
                <p className="text-sm text-slate-400">
                  <strong>Γεγονός:</strong> Στην εφηβεία, η μελατονίνη εκκρίνεται συχνά πιο αργά το βράδυ, γι' αυτό οι έφηβοι κοιμούνται πιο αργά.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Benefits vs Consequences */}
        <section>
          <SectionHeader 
            title="Τα Δύο Πρόσωπα του Ύπνου" 
            subtitle="Πώς επηρεάζει ο επαρκής ύπνος την καθημερινότητά μας σε σχέση με την έλλειψή του."
          />
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg mr-4">
                  <Battery className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Οφέλη Επαρκούς Ύπνου</h3>
              </div>
              <div className="grid gap-4">
                <InfoCard 
                  icon={<Brain className="w-6 h-6" />} 
                  title="Μνήμη & Μάθηση" 
                  text="Βελτιώνει τη συγκέντρωση, την κριτική σκέψη και τη σχολική επίδοση."
                  color="bg-emerald-900/20 border-emerald-500/30"
                />
                <InfoCard 
                  icon={<TrendingUp className="w-6 h-6" />} 
                  title="Σωματική Ανάπτυξη" 
                  text="Υποστηρίζει την ανάπτυξη (ορμόνες), την ενέργεια και το ανοσοποιητικό σύστημα."
                  color="bg-emerald-900/20 border-emerald-500/30"
                />
                <InfoCard 
                  icon={<ShieldCheck className="w-6 h-6" />} 
                  title="Συναισθηματική Ισορροπία" 
                  text="Καλύτερη διαχείριση άγχους και λιγότερες συναισθηματικές μεταπτώσεις."
                  color="bg-emerald-900/20 border-emerald-500/30"
                />
              </div>
            </div>

            {/* Consequences */}
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-rose-500/20 rounded-lg mr-4">
                  <AlertTriangle className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Επιπτώσεις Έλλειψης</h3>
              </div>
              <div className="grid gap-4">
                <InfoCard 
                  icon={<Brain className="w-6 h-6" />} 
                  title="Μειωμένη Απόδοση" 
                  text="Δυσκολία στη συγκέντρωση, κενά μνήμης και πτώση σχολικών βαθμών."
                  color="bg-rose-900/20 border-rose-500/30"
                />
                <InfoCard 
                  icon={<Heart className="w-6 h-6" />} 
                  title="Υγεία & Βάρος" 
                  text="Αυξημένος κίνδυνος για παχυσαρκία (λόγω ορμονών πείνας) και ασθένειες."
                  color="bg-rose-900/20 border-rose-500/30"
                />
                <InfoCard 
                  icon={<AlertTriangle className="w-6 h-6" />} 
                  title="Κίνδυνοι Ατυχημάτων" 
                  text="Μειωμένα αντανακλαστικά που οδηγούν σε ατυχήματα και τραυματισμούς."
                  color="bg-rose-900/20 border-rose-500/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Sleep Hygiene Tips */}
        <section className="relative">
          <div className="absolute inset-0 bg-indigo-900/20 transform -skew-y-3 rounded-3xl z-0"></div>
          <div className="relative z-10 py-8">
            <SectionHeader 
              title="Συμβουλές για Καλύτερο Ύπνο" 
              subtitle="Μικρές αλλαγές για μεγάλη διαφορά."
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl text-center hover:translate-y-[-5px] transition-transform border border-slate-700">
                <div className="bg-teal-500/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-teal-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Μακριά οι Οθόνες</h4>
                <p className="text-sm text-slate-400">Αποφυγή κινητού/tablet 1 ώρα πριν τον ύπνο. Το μπλε φως εμποδίζει τη μελατονίνη.</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-center hover:translate-y-[-5px] transition-transform border border-slate-700">
                <div className="bg-purple-500/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Coffee className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Προσοχή στη Διατροφή</h4>
                <p className="text-sm text-slate-400">Αποφυγή καφεΐνης και βαριών γευμάτων το βράδυ. Προκαλούν υπερένταση.</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-center hover:translate-y-[-5px] transition-transform border border-slate-700">
                <div className="bg-blue-500/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Σταθερό Πρόγραμμα</h4>
                <p className="text-sm text-slate-400">Κοιμήσου και ξύπνα την ίδια ώρα κάθε μέρα, ακόμη και τα Σαββατοκύριακα.</p>
              </div>

              <div className="bg-slate-800 p-6 rounded-xl text-center hover:translate-y-[-5px] transition-transform border border-slate-700">
                <div className="bg-pink-500/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-pink-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Ρουτίνα Χαλάρωσης</h4>
                <p className="text-sm text-slate-400">Διάβασε ένα βιβλίο, κάνε ένα ζεστό μπάνιο ή άκουσε ήρεμη μουσική.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Quiz */}
        <section id="quiz">
          <SectionHeader 
            title="Έλεγξε τις γνώσεις σου" 
            subtitle="Πόσα πραγματικά γνωρίζεις για τον ύπνο;"
          />
          <Quiz />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          </div>
          <p className="text-slate-500 text-sm mb-2">
            Πηγή: Υπουργείο Παιδείας, Αθλητισμού και Νεολαίας Κύπρου
          </p>
          <p className="text-slate-600 text-xs">
            Αγωγή Υγείας Β' Γυμνασίου | Κεφάλαιο 1: Ύπνος και Υγεία
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
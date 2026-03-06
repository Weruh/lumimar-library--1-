
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LibraryGrid from './components/LibraryGrid';
import { CartItem, CheckoutCustomer, ContentType, LibraryItem, OrderDelivery, OrderPayment, OrderRecord, TabType } from './types';
import { BookOpen, Library as LibraryIcon } from 'lucide-react';
import basicsOfForexCover from './assets/business/The Basics of Forex.jpg';
import becomingPersonalFinanceGuruCover from './assets/business/Becoming A Personal Finance Guru.webp';
import bitcoinBreakthroughCover from './assets/business/Bitcoin Breakthrough.webp';
import bitcoinProfitSecretsCover from './assets/business/Bitcoin Profit Secrets.webp';
import blockchainSecretsCover from './assets/business/Blockchain Secrets.webp';
import financialIntelligenceForWealthBuildingCover from './assets/business/Financial Intelligence For Wealth Building.webp';
import successfulDropshipperCover from './assets/business/Guide To Becoming A Successful Dropshipper.jpg';
import rippleGeneratingSystemCover from './assets/business/How To Set Up A Ripple (Crypto Currency) Generating System.webp';
import insidersGuideToForexTradingCover from './assets/business/The Insider\'s Guide To Forex Trading.jpg';
import moneyLessonsForAllAgesCover from './assets/business/Money Lessons For All Ages.webp';
import achievePeakPerformanceCover from './assets/lifestyle/Achieve Peak Performance.webp';
import healthyHabitsCover from './assets/lifestyle/Healthy Habits.webp';
import obtainMindfulnessCover from './assets/lifestyle/Obtain Mindfulness.webp';
import pregnancyAndChildbirthCover from './assets/lifestyle/Pregnancy And Childbirth.jpg';
import rewritingYourStoryCover from './assets/lifestyle/Rewriting Your Story.webp';
import selfConfidenceExpertCover from './assets/lifestyle/Self Confidence Expert.webp';
import theArtOfConsistencyCover from './assets/lifestyle/The Art Of Consistensy.webp';
import theGrowthMindsetCover from './assets/lifestyle/The Growth Mindset.webp';
import theResilientBodyCover from './assets/lifestyle/The Resilient Body.webp';
import theSavvyEntrepreneurCover from './assets/lifestyle/The Savvy Entrepreneur.webp';
import beyondIqCover from './assets/psychology/Beyond IQ.webp';
import brainResetCover from './assets/psychology/Brain Reset.webp';
import gainEmotionalIntelligenceCover from './assets/psychology/Gain Emotional Intelligence.webp';
import ironDisciplineCover from './assets/psychology/Iron Discipline.webp';
import livingYourLongestCover from './assets/psychology/Living Your Longest.webp';
import overcomeAnxietyCover from './assets/psychology/Overcome Anxiety.webp';
import overcomeImposterSyndromeCover from './assets/psychology/Overcome Imposter Syndrome.webp';
import overcomeObstaclesCover from './assets/psychology/Overcome Obstacles.webp';
import powerOfTheSubconsciousMindCover from './assets/psychology/The Power Of The Subconscious Mind.webp';
import psychologyOfMotivationCover from './assets/psychology/The Psychology Of Motivation.webp';
import beingWholeCover from './assets/relationship/Being Whole.webp';
import chaosToCalmCover from './assets/relationship/Chaos To Calm.webp';
import defeatingDivorceCover from './assets/relationship/Defeating Divorce.webp';
import findingBalanceCover from './assets/relationship/Finding Balance.webp';
import howToCatchCheatingLoverCover from './assets/relationship/How To Catch A Cheating Lover.webp';
import instantSparkCover from './assets/relationship/Instant Spark.webp';
import intimacyIntrudersCover from './assets/relationship/Intimacy Intruders.webp';
import unlockYourFullPotentialCover from './assets/relationship/Unlock Your Full Potential.webp';
import unplugCover from './assets/relationship/Unplug.webp';

const RELATIONSHIP_PRICE_TAG = '$4 / KES 500';
const BUSINESS_PRICE_TAG = '$7 / KES 1000';
const getPaystackLink = (slug: string): string => `https://paystack.com/pay/${slug}`;
const LEGACY_PSYCHOLOGY_ID_TO_LIFESTYLE_ID: Record<string, string> = {
  'psychology-the-art-of-consistency': 'lifestyle-the-art-of-consistency',
  'psychology-rewriting-your-story': 'lifestyle-rewriting-your-story',
  'psychology-the-resilient-body': 'lifestyle-the-resilient-body',
  'psychology-the-growth-mindset': 'lifestyle-the-growth-mindset',
  'psychology-healthy-habits': 'lifestyle-healthy-habits',
  'psychology-obtain-mindfulness': 'lifestyle-obtain-mindfulness',
  'psychology-the-savvy-entrepreneur': 'lifestyle-the-savvy-entrepreneur',
  'psychology-self-confidence-expert': 'lifestyle-self-confidence-expert',
  'psychology-achieve-peak-performance': 'lifestyle-achieve-peak-performance',
  'psychology-pregnancy-and-childbirth': 'lifestyle-pregnancy-and-childbirth',
};
const CATEGORY_PSYCHOLOGY = 'Psychology';
const CATEGORY_LIFESTYLE = 'Lifestyle';
const REMOVED_LIBRARY_TITLES = new Set([
  'the art of minimalist living',
  'unapologetically me',
  'social media marketing made easy',
]);

const INITIAL_ITEMS: LibraryItem[] = [
  {
    id: 'relationship-how-to-catch-a-cheating-lover',
    title: 'How To Catch A Cheating Lover',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/how-to-catch-a-cheating-lover-yxlhnv',
    description: 'Stealth strategies to identify infidelity signs early and confront relationship issues with clarity.',
    imageUrl: howToCatchCheatingLoverCover,
    createdAt: Date.now()
  },
  {
    id: 'relationship-unplug',
    title: 'Unplug',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/unplug-ernwjz',
    description: 'A practical guide to reduce digital overload and reconnect with meaningful real-world relationships.',
    imageUrl: unplugCover,
    createdAt: Date.now() - 1000
  },
  {
    id: 'relationship-intimacy-intruders',
    title: 'Intimacy Intruders',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/get-your-ex-back-in-just-7-days-vqaxpb',
    description: 'Step-by-step guidance for navigating sexual challenges and restoring deeper emotional connection.',
    imageUrl: intimacyIntrudersCover,
    createdAt: Date.now() - 2000
  },
  {
    id: 'relationship-unlock-your-full-potential',
    title: 'Unlock Your Full Potential',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl:'https://paystack.com/buy/unlock-your-full-potential-jgzygl',
    description: 'Mindset and confidence frameworks to build healthier bonds while pursuing your highest personal goals.',
    imageUrl: unlockYourFullPotentialCover,
    createdAt: Date.now() - 3000
  },
  {
    id: 'relationship-chaos-to-calm',
    title: 'Chaos To Calm',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/chaos-to-calm-gorrwi',
    description: 'Practical techniques for calming conflict, reducing stress, and creating emotional stability at home.',
    imageUrl: chaosToCalmCover,
    createdAt: Date.now() - 4000
  },
  {
    id: 'relationship-finding-balance',
    title: 'Finding Balance',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/finding-balance-etipsp',
    description: 'Restore peace between love, work, and personal wellbeing using simple everyday routines.',
    imageUrl: findingBalanceCover,
    createdAt: Date.now() - 6000
  },
  {
    id: 'relationship-defeating-divorce',
    title: 'Defeating Divorce',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/defeating-divorce-mdbfpw',
    description: 'Understand core marriage tensions and apply practical actions to repair trust before separation.',
    imageUrl: defeatingDivorceCover,
    createdAt: Date.now() - 7000
  },
  {
    id: 'relationship-being-whole',
    title: 'Being Whole',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/being-whole-wksxtc',
    description: 'A holistic blueprint for strengthening physical, mental, and spiritual health within your relationship journey.',
    imageUrl: beingWholeCover,
    createdAt: Date.now() - 8000
  },
  {
    id: 'relationship-instant-spark',
    title: 'Instant Spark',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Relationships',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/instant-spark-tunttt',
    description: 'Actionable dating and communication tips to reignite chemistry and build genuine attraction quickly.',
    imageUrl: instantSparkCover,
    createdAt: Date.now() - 9000
  },
  {
    id: 'business-becoming-a-personal-finance-guru',
    title: 'Becoming A Personal Finance Guru',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/becoming-a-personal-finance-guru-vvgcmb',
    description: 'A practical starter guide to budgeting, money management, and wealth-building fundamentals.',
    imageUrl: becomingPersonalFinanceGuruCover,
    createdAt: Date.now() - 10000
  },
  {
    id: 'business-the-basics-of-forex',
    title: 'The Basics of Forex',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-basics-of-forex-azggbn',
    description: 'Understand currency markets and build a clear forex foundation with beginner-focused strategies.',
    imageUrl: basicsOfForexCover,
    createdAt: Date.now() - 11000
  },
  {
    id: 'business-the-insiders-guide-to-forex-trading',
    title: 'The Insider\'s Guide To Forex Trading',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-insiders-guide-to-forex-trading-auqham',
    description: 'Dive deeper into real-world forex execution, chart reading, and trader decision frameworks.',
    imageUrl: insidersGuideToForexTradingCover,
    createdAt: Date.now() - 12000
  },
  {
    id: 'business-how-to-set-up-a-ripple-generating-system',
    title: 'How To Set Up A Ripple (Crypto Currency) Generating System',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/how-to-set-up-a-ripple-crypto-currency-generating-sys-izzmhv',
    description: 'A tactical blueprint for setting up and understanding XRP-focused crypto income systems.',
    imageUrl: rippleGeneratingSystemCover,
    createdAt: Date.now() - 13000
  },
  {
    id: 'business-financial-intelligence-for-wealth-building',
    title: 'Financial Intelligence For Wealth Building',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/financial-intelligence-for-wealth-building-cqsoza',
    description: 'Master financial literacy principles that support long-term wealth creation and smart investing.',
    imageUrl: financialIntelligenceForWealthBuildingCover,
    createdAt: Date.now() - 14000
  },
  {
    id: 'business-bitcoin-profit-secrets',
    title: 'Bitcoin Profit Secrets',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/bitcoin-profit-secrets-fkknoj',
    description: 'Learn practical methods for evaluating opportunities and profiting from Bitcoin market cycles.',
    imageUrl: bitcoinProfitSecretsCover,
    createdAt: Date.now() - 15000
  },
  {
    id: 'business-blockchain-secrets',
    title: 'Blockchain Secrets',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/blockchain-secrets-iuusbq',
    description: 'Understand blockchain systems, crypto infrastructure, and emerging internet finance trends.',
    imageUrl: blockchainSecretsCover,
    createdAt: Date.now() - 16000
  },
  {
    id: 'business-money-lessons-for-all-ages',
    title: 'Money Lessons For All Ages',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/money-lessons-for-all-ages-pnwrry',
    description: 'A simple, actionable money handbook for building strong financial habits at any stage of life.',
    imageUrl: moneyLessonsForAllAgesCover,
    createdAt: Date.now() - 17000
  },
  {
    id: 'business-bitcoin-breakthrough',
    title: 'Bitcoin Breakthrough',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 7,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/bitcoin-breakthrough-tadihq',
    description: 'A beginner-friendly guide to profiting with Bitcoin during volatile and uncertain economies.',
    imageUrl: bitcoinBreakthroughCover,
    createdAt: Date.now() - 18000
  },
  {
    id: 'business-guide-to-becoming-a-successful-dropshipper',
    title: 'Guide To Becoming A Successful Dropshipper',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Business',
    price: 4,
    displayPrice: BUSINESS_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/guide-to-successful-dropshipper-xulrmv',
    description: 'Step-by-step guidance to launch, optimize, and scale a profitable dropshipping business.',
    imageUrl: successfulDropshipperCover,
    createdAt: Date.now() - 19000
  },
  {
    id: 'lifestyle-the-art-of-consistency',
    title: 'The Art Of Consistency',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-art-of-consistensy-mahzal',
    description: 'Build discipline habits and practical consistency systems that compound into long-term success.',
    imageUrl: theArtOfConsistencyCover,
    createdAt: Date.now() - 20000
  },
  {
    id: 'lifestyle-rewriting-your-story',
    title: 'Rewriting Your Story',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/rewriting-your-story-eqhltp',
    description: 'Break limiting beliefs and replace old narratives with patterns that move your life forward.',
    imageUrl: rewritingYourStoryCover,
    createdAt: Date.now() - 21000
  },
  {
    id: 'lifestyle-the-resilient-body',
    title: 'The Resilient Body',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-resilient-body-yfatqu',
    description: 'A practical guide to restoring strength, energy, and emotional resilience under pressure.',
    imageUrl: theResilientBodyCover,
    createdAt: Date.now() - 22000
  },
  {
    id: 'lifestyle-the-growth-mindset',
    title: 'The Growth Mindset',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-growth-mindset-qqhzsv',
    description: 'Train your mind to embrace learning, persistence, and long-term personal transformation.',
    imageUrl: theGrowthMindsetCover,
    createdAt: Date.now() - 23000
  },
  {
    id: 'lifestyle-healthy-habits',
    title: 'Healthy Habits',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/healthy-habits-tmbezh',
    description: 'Simple daily behavior upgrades to improve wellbeing, clarity, and sustainable lifestyle change.',
    imageUrl: healthyHabitsCover,
    createdAt: Date.now() - 24000
  },
  {
    id: 'lifestyle-obtain-mindfulness',
    title: 'Obtain Mindfulness',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/obtain-mindfulness-cznelx',
    description: 'Step-by-step mindfulness and meditation techniques for reduced stress and better focus.',
    imageUrl: obtainMindfulnessCover,
    createdAt: Date.now() - 25000
  },
  {
    id: 'lifestyle-the-savvy-entrepreneur',
    title: 'The Savvy Entrepreneur',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-savvy-entrepreneur-pqvgfp',
    description: 'Develop entrepreneurial psychology, decision-making discipline, and strategic confidence.',
    imageUrl: theSavvyEntrepreneurCover,
    createdAt: Date.now() - 26000
  },
  {
    id: 'lifestyle-self-confidence-expert',
    title: 'Self Confidence Expert',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/self-confidence-expert-ctwrap',
    description: 'Practical confidence frameworks to overcome self-doubt and perform better in life.',
    imageUrl: selfConfidenceExpertCover,
    createdAt: Date.now() - 27000
  },
  {
    id: 'lifestyle-achieve-peak-performance',
    title: 'Achieve Peak Performance',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/achieve-peak-performance-mrkxdp',
    description: 'A high-performance mindset playbook for sustained focus, output, and personal excellence.',
    imageUrl: achievePeakPerformanceCover,
    createdAt: Date.now() - 28000
  },
  {
    id: 'lifestyle-pregnancy-and-childbirth',
    title: 'Pregnancy And Childbirth',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Lifestyle',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/pregnancy-and-childbirth-opfdls',
    description: 'Emotional resilience and practical guidance for navigating pregnancy with confidence and calm.',
    imageUrl: pregnancyAndChildbirthCover,
    createdAt: Date.now() - 29000
  },
  {
    id: 'psychology-beyond-iq',
    title: 'Beyond IQ',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/beyond-iq-xjuwzd',
    description: 'Understand emotional intelligence and use it to improve decision-making, relationships, and performance.',
    imageUrl: beyondIqCover,
    createdAt: Date.now() - 30000
  },
  {
    id: 'psychology-overcome-imposter-syndrome',
    title: 'Overcome Imposter Syndrome',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/overcome-imposter-syndrome-ywwhqq',
    description: 'Stop self-doubt cycles, build confidence at work, and own your progress without fear.',
    imageUrl: overcomeImposterSyndromeCover,
    createdAt: Date.now() - 31000
  },
  {
    id: 'psychology-overcome-obstacles',
    title: 'Overcome Obstacles',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/overcome-obstacles-luwqcg',
    description: 'A practical framework for turning setbacks into action and long-term success.',
    imageUrl: overcomeObstaclesCover,
    createdAt: Date.now() - 32000
  },
  {
    id: 'psychology-brain-reset',
    title: 'Brain Reset',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/brain-reset-fkevrw',
    description: 'Reset limiting thought patterns and sharpen clarity for better personal and professional focus.',
    imageUrl: brainResetCover,
    createdAt: Date.now() - 33000
  },
  {
    id: 'psychology-overcome-anxiety',
    title: 'Overcome Anxiety',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/overcome-anxiety-ynaced',
    description: 'Break anxiety loops and regain calm, control, and emotional balance day by day.',
    imageUrl: overcomeAnxietyCover,
    createdAt: Date.now() - 34000
  },
  {
    id: 'psychology-living-your-longest',
    title: 'Living Your Longest',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/living-your-longest-gpqzhn',
    description: 'Learn sustainable wellness habits that support longevity, vitality, and a healthier lifestyle.',
    imageUrl: livingYourLongestCover,
    createdAt: Date.now() - 35000
  },
  {
    id: 'psychology-iron-discipline',
    title: 'Iron Discipline',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/iron-discipline-xscmlq',
    description: 'Build unstoppable discipline and consistency systems you can apply to every major goal.',
    imageUrl: ironDisciplineCover,
    createdAt: Date.now() - 36000
  },
  {
    id: 'psychology-gain-emotional-intelligence',
    title: 'Gain Emotional Intelligence',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/gain-emotional-intelligence-jhafms',
    description: 'Develop stronger self-awareness, communication, and relationship skills step by step.',
    imageUrl: gainEmotionalIntelligenceCover,
    createdAt: Date.now() - 37000
  },
  {
    id: 'psychology-the-psychology-of-motivation',
    title: 'The Psychology Of Motivation',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-psychology-of-motivation-jiynba',
    description: 'Master the drivers behind motivation so you can sustain momentum and peak performance.',
    imageUrl: psychologyOfMotivationCover,
    createdAt: Date.now() - 38000
  },
  {
    id: 'psychology-the-power-of-the-subconscious-mind',
    title: 'The Power Of The Subconscious Mind',
    author: 'Lumimar Publishing',
    type: 'ebook',
    category: 'Psychology',
    price: 4,
    displayPrice: RELATIONSHIP_PRICE_TAG,
    paystackUrl: 'https://paystack.com/buy/the-power-of-the-subconscious-mind-avbyss',
    description: 'Use subconscious reprogramming principles to shift beliefs, behavior, and outcomes.',
    imageUrl: powerOfTheSubconsciousMindCover,
    createdAt: Date.now() - 39000
  },
];

const STORAGE_KEYS = {
  library: 'lumimar_library',
  cart: 'lumimar_cart',
  orders: 'lumimar_orders',
} as const;

const CONTENT_TYPES: ContentType[] = ['ebook', 'course', 'bundle'];
const PAYMENT_STATUSES = ['not_required', 'pending', 'paid', 'failed'] as const;
const PAYMENT_PROVIDERS = ['none', 'paystack'] as const;

const getStoredJson = (key: string): unknown => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const setStoredJson = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write failures (e.g., privacy mode quota restrictions).
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isContentType = (value: unknown): value is ContentType =>
  typeof value === 'string' && CONTENT_TYPES.includes(value as ContentType);

const isPaymentStatus = (value: unknown): value is OrderPayment['status'] =>
  typeof value === 'string' && PAYMENT_STATUSES.includes(value as OrderPayment['status']);

const isPaymentProvider = (value: unknown): value is OrderPayment['provider'] =>
  typeof value === 'string' && PAYMENT_PROVIDERS.includes(value as OrderPayment['provider']);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const toSafeString = (value: unknown): string | null =>
  typeof value === 'string' ? value.trim() : null;

const migrateLegacyLibraryItem = (item: LibraryItem): LibraryItem => {
  const nextId = LEGACY_PSYCHOLOGY_ID_TO_LIFESTYLE_ID[item.id] ?? item.id;
  const isLegacyLifestyleRecord = nextId !== item.id;
  const nextCategory = isLegacyLifestyleRecord ? CATEGORY_LIFESTYLE : item.category;
  const nextPaystackUrl = isLegacyLifestyleRecord && item.paystackUrl
    ? item.paystackUrl.replace('/pay/psychology-', '/pay/lifestyle-')
    : item.paystackUrl;

  if (nextId === item.id && nextCategory === item.category && nextPaystackUrl === item.paystackUrl) {
    return item;
  }

  return {
    ...item,
    id: nextId,
    category: nextCategory,
    paystackUrl: nextPaystackUrl,
  };
};

const dedupeLibraryItemsById = (items: LibraryItem[]): LibraryItem[] => {
  const byId = new Map<string, LibraryItem>();
  for (const item of items) {
    const existing = byId.get(item.id);
    if (!existing || item.createdAt > existing.createdAt) {
      byId.set(item.id, item);
    }
  }
  return Array.from(byId.values());
};

const isRemovedLibraryItem = (item: Pick<LibraryItem, 'title'>): boolean =>
  REMOVED_LIBRARY_TITLES.has(item.title.trim().toLowerCase());

const sanitizeDelivery = (value: unknown): OrderDelivery | undefined => {
  if (!isRecord(value) || !Array.isArray(value.links)) {
    return undefined;
  }

  const generatedAt = isFiniteNumber(value.generatedAt) ? value.generatedAt : Date.now();
  const expiresAt = isFiniteNumber(value.expiresAt) ? value.expiresAt : generatedAt;

  const links = value.links
    .map((link): OrderDelivery['links'][number] | null => {
      if (!isRecord(link)) return null;
      const itemId = toSafeString(link.itemId);
      const title = toSafeString(link.title);
      const downloadUrl = toSafeString(link.downloadUrl);
      const linkExpiresAt = isFiniteNumber(link.expiresAt) ? link.expiresAt : expiresAt;

      if (!itemId || !title || !downloadUrl) {
        return null;
      }

      return {
        itemId,
        title,
        downloadUrl,
        expiresAt: linkExpiresAt,
      };
    })
    .filter((link): link is OrderDelivery['links'][number] => link !== null);

  if (links.length === 0) {
    return undefined;
  }

  return {
    generatedAt,
    expiresAt,
    links,
  };
};

const sanitizeLibraryItem = (value: unknown): LibraryItem | null => {
  if (!isRecord(value)) return null;

  const id = toSafeString(value.id);
  const title = toSafeString(value.title);
  const author = toSafeString(value.author);
  const category = toSafeString(value.category);
  const description = toSafeString(value.description);
  const imageUrl = toSafeString(value.imageUrl);
  const contentSnippet = value.contentSnippet;
  const displayPrice = toSafeString(value.displayPrice) || undefined;
  const paystackUrl = toSafeString(value.paystackUrl) || undefined;

  if (
    !id ||
    !title ||
    !author ||
    !category ||
    !description ||
    !imageUrl ||
    !isContentType(value.type) ||
    !isFiniteNumber(value.price) ||
    value.price < 0 ||
    !isFiniteNumber(value.createdAt)
  ) {
    return null;
  }

  const parsed: LibraryItem = {
    id,
    title,
    author,
    type: value.type,
    category,
    description,
    imageUrl,
    price: value.price,
    createdAt: value.createdAt,
  };

  if (typeof contentSnippet === 'string') {
    parsed.contentSnippet = contentSnippet;
  }
  if (displayPrice) {
    parsed.displayPrice = displayPrice;
  }
  if (paystackUrl) {
    parsed.paystackUrl = paystackUrl;
  }

  return migrateLegacyLibraryItem(parsed);
};

const sanitizeCartItem = (value: unknown): CartItem | null => {
  if (!isRecord(value)) return null;
  const item = sanitizeLibraryItem(value.item);
  if (!item || !isFiniteNumber(value.quantity)) return null;

  const quantity = Math.floor(value.quantity);
  if (quantity < 1) return null;

  return { item, quantity };
};

const sanitizeCustomer = (value: unknown): CheckoutCustomer | null => {
  if (!isRecord(value)) return null;

  const fullName = toSafeString(value.fullName);
  const email = toSafeString(value.email);
  const country = toSafeString(value.country);
  const addressLine = toSafeString(value.addressLine);
  const city = toSafeString(value.city);
  const state = toSafeString(value.state);
  const postalCode = toSafeString(value.postalCode);

  if (!fullName || !email || !country || !addressLine || !city || !state || !postalCode) {
    return null;
  }

  return { fullName, email, country, addressLine, city, state, postalCode };
};

const sanitizeOrderPayment = (value: unknown, paymentRequired: boolean): OrderPayment => {
  const fallback: OrderPayment = {
    status: paymentRequired ? 'paid' : 'not_required',
    provider: 'none',
    currency: 'USD',
  };

  if (!isRecord(value)) {
    return fallback;
  }

  const status = isPaymentStatus(value.status) ? value.status : fallback.status;
  const provider = isPaymentProvider(value.provider) ? value.provider : fallback.provider;
  const currency = toSafeString(value.currency) || fallback.currency;
  const reference = toSafeString(value.reference) || undefined;
  const transactionId = toSafeString(value.transactionId) || undefined;
  const paidAt = isFiniteNumber(value.paidAt) ? value.paidAt : undefined;

  return {
    status,
    provider,
    currency,
    reference,
    transactionId,
    paidAt,
  };
};

const sanitizeOrder = (value: unknown): OrderRecord | null => {
  if (!isRecord(value)) return null;

  const id = toSafeString(value.id);
  const customer = sanitizeCustomer(value.customer);
  if (!id || !customer || !Array.isArray(value.items)) return null;

  const items = value.items
    .map(sanitizeCartItem)
    .filter((item): item is CartItem => item !== null);

  if (
    items.length === 0 ||
    !isFiniteNumber(value.subtotal) ||
    !isFiniteNumber(value.tax) ||
    !isFiniteNumber(value.total) ||
    !isFiniteNumber(value.createdAt) ||
    value.subtotal < 0 ||
    value.tax < 0 ||
    value.total < 0 ||
    typeof value.paymentRequired !== 'boolean'
  ) {
    return null;
  }

  return {
    id,
    items,
    customer,
    subtotal: value.subtotal,
    tax: value.tax,
    total: value.total,
    createdAt: value.createdAt,
    paymentRequired: value.paymentRequired,
    payment: sanitizeOrderPayment(value.payment, value.paymentRequired),
    delivery: sanitizeDelivery(value.delivery),
  };
};

const mergeWithInitialItems = (savedItems: LibraryItem[]): { items: LibraryItem[]; changed: boolean } => {
  const byId = new Map(savedItems.map(item => [item.id, item]));
  const merged = [...savedItems];
  let changed = false;

  for (const initialItem of INITIAL_ITEMS) {
    const existing = byId.get(initialItem.id);
    if (!existing) {
      merged.push(initialItem);
      byId.set(initialItem.id, initialItem);
      changed = true;
      continue;
    }

    const nextCategory = initialItem.category || existing.category;
    const nextDisplayPrice = initialItem.displayPrice ?? existing.displayPrice;
    const nextPaystackUrl = initialItem.paystackUrl ?? existing.paystackUrl;
    const nextImageUrl = initialItem.imageUrl || existing.imageUrl;
    if (
      nextCategory === existing.category &&
      nextDisplayPrice === existing.displayPrice &&
      nextPaystackUrl === existing.paystackUrl &&
      nextImageUrl === existing.imageUrl
    ) {
      continue;
    }

    const index = merged.findIndex(item => item.id === initialItem.id);
    if (index >= 0) {
      merged[index] = {
        ...existing,
        category: nextCategory,
        imageUrl: nextImageUrl,
        displayPrice: nextDisplayPrice,
        paystackUrl: nextPaystackUrl,
      };
      changed = true;
    }
  }

  return { items: merged, changed };
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('library');
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    const savedLibrary = getStoredJson(STORAGE_KEYS.library);
    if (Array.isArray(savedLibrary)) {
      const parsedLibrary = savedLibrary
        .map(sanitizeLibraryItem)
        .filter((item): item is LibraryItem => item !== null);
      const normalizedLibrary = dedupeLibraryItemsById(parsedLibrary);
      const filteredLibrary = normalizedLibrary.filter(item => !isRemovedLibraryItem(item));
      const { items: hydratedLibrary, changed } = mergeWithInitialItems(filteredLibrary);
      setItems(hydratedLibrary);
      if (
        changed ||
        normalizedLibrary.length !== savedLibrary.length ||
        filteredLibrary.length !== normalizedLibrary.length
      ) {
        setStoredJson(STORAGE_KEYS.library, hydratedLibrary);
      }
    } else {
      const filteredInitialItems = INITIAL_ITEMS.filter(item => !isRemovedLibraryItem(item));
      setItems(filteredInitialItems);
      setStoredJson(STORAGE_KEYS.library, filteredInitialItems);
    }

    const savedCart = getStoredJson(STORAGE_KEYS.cart);
    if (Array.isArray(savedCart)) {
      const parsedCart = savedCart
        .map(sanitizeCartItem)
        .filter((item): item is CartItem => item !== null)
        .filter(line => !isRemovedLibraryItem(line.item));
      setCart(parsedCart);
      if (parsedCart.length !== savedCart.length) {
        setStoredJson(STORAGE_KEYS.cart, parsedCart);
      }
    } else {
      setCart([]);
    }

    const savedOrders = getStoredJson(STORAGE_KEYS.orders);
    if (Array.isArray(savedOrders)) {
      const parsedOrders = savedOrders
        .map(sanitizeOrder)
        .filter((order): order is OrderRecord => order !== null);
      setOrders(parsedOrders);
      if (parsedOrders.length !== savedOrders.length) {
        setStoredJson(STORAGE_KEYS.orders, parsedOrders);
      }
    } else {
      setOrders([]);
    }
  }, []);

  const upsertCartItem = (item: LibraryItem) => {
    setCart(prev => {
      const existing = prev.find(line => line.item.id === item.id);
      const updated = existing
        ? prev.map(line =>
            line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line
          )
        : [...prev, { item, quantity: 1 }];
      setStoredJson(STORAGE_KEYS.cart, updated);
      return updated;
    });
  };

  const handleBuyNow = (item: LibraryItem) => {
    if (item.paystackUrl) {
      window.open(item.paystackUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    window.alert('Payment link unavailable for this item right now.');
  };

  const handleIncreaseQty = (itemId: string) => {
    setCart(prev => {
      const updated = prev.map(line =>
        line.item.id === itemId ? { ...line, quantity: line.quantity + 1 } : line
      );
      setStoredJson(STORAGE_KEYS.cart, updated);
      return updated;
    });
  };

  const handleDecreaseQty = (itemId: string) => {
    setCart(prev => {
      const updated = prev
        .map(line =>
          line.item.id === itemId ? { ...line, quantity: Math.max(0, line.quantity - 1) } : line
        )
        .filter(line => line.quantity > 0);
      setStoredJson(STORAGE_KEYS.cart, updated);
      return updated;
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart(prev => {
      const updated = prev.filter(line => line.item.id !== itemId);
      setStoredJson(STORAGE_KEYS.cart, updated);
      return updated;
    });
  };

  const handlePlaceOrder = (customer: CheckoutCustomer, payment: OrderPayment): OrderRecord => {
    const subtotal = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
    const paymentRequired = subtotal > 0;
    const tax = paymentRequired ? subtotal * 0.07 : 0;
    const total = subtotal + tax;
    const normalizedPayment: OrderPayment = paymentRequired
      ? payment
      : {
          status: 'not_required',
          provider: 'none',
          currency: payment.currency || 'USD',
        };

    const order: OrderRecord = {
      id: `LM${Date.now().toString().slice(-8)}`,
      items: cart.map(line => ({ ...line })),
      customer,
      subtotal,
      tax,
      total,
      createdAt: Date.now(),
      paymentRequired,
      payment: normalizedPayment,
    };

    setOrders(prev => {
      const updated = [order, ...prev];
      setStoredJson(STORAGE_KEYS.orders, updated);
      return updated;
    });

    setCart([]);
    setStoredJson(STORAGE_KEYS.cart, []);

    return order;
  };

  const handleAttachDelivery = (orderId: string, delivery: OrderDelivery): void => {
    setOrders(prev => {
      const updated = prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              delivery,
            }
          : order,
      );

      setStoredJson(STORAGE_KEYS.orders, updated);
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 w-full">
        {activeTab === 'library' && (
          <section className="py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-4 tracking-tighter">
                  My Collection
                </h2>
                <p className="text-stone-500 font-medium max-w-xl text-lg leading-relaxed">
                  Learn it, apply it, win it with practical books and courses that upgrade your mind, income, and life. Knowledge you can buy today and use forever. Every book and course here is a step toward your next great achievement.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="p-4 border border-stone-200 rounded-3xl bg-white chic-shadow flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-900 border border-stone-100">
                    <LibraryIcon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Library Size</p>
                    <p className="text-sm font-bold text-stone-900">{items.length} Assets</p>
                  </div>
                </div>
              </div>
            </div>
            <LibraryGrid items={items} onBuyNow={handleBuyNow} />
          </section>
        )}

        {activeTab === 'about' && (
          <section className="max-w-3xl mx-auto py-20 text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
              <h2 className="text-6xl font-serif font-bold text-stone-900 tracking-tighter">The Vision</h2>
              <div className="w-24 h-1 gold-gradient mx-auto rounded-full" />
            </div>
            
            <div className="prose prose-stone prose-lg mx-auto text-stone-600 leading-relaxed font-medium italic">
              <p>
                "Lumimar Library was born from a desire to turn cluttered digital downloads into a gallery of luxury education."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
              <div className="p-8 bg-white rounded-3xl border border-stone-100 chic-shadow">
                <BookOpen className="text-stone-900 mb-4" size={32} />
                <h3 className="text-xl font-serif font-bold mb-2">Curated Learning</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Discover practical books and courses organized by life focus so every session has a clear purpose and a next step you can apply immediately.
                </p>
              </div>
              <div className="p-8 bg-stone-900 text-white rounded-3xl chic-shadow">
                <LibraryIcon className="text-white mb-4" size={32} />
                <h3 className="text-xl font-serif font-bold mb-2">Chic Organization</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  Access specialized folders on different topics in life. Your knowledge is organized into aesthetic categories designed for focus and clarity.
                </p>
              </div>
            </div>

            <footer className="pt-20 border-t border-stone-100">
              <p className="text-stone-400 text-[10px] flex items-center justify-center gap-2 font-bold uppercase tracking-widest">
                Made for digital creators &copy; 2024 Lumimar Library
              </p>
            </footer>
          </section>
        )}
      </main>

    </div>
  );
};

export default App;

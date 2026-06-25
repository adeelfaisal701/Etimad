import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      signup: "Sign Up",
      register: "Register",
      name: "Name",
      email: "Email",
      phone: "Phone",
      password: "Password",
      buyer: "Buyer",
      seller: "Seller",

      search: "Search...",
      searchProducts: "Search products...",
      changeLang: "Change Language",

      apparels: "Apparels",
      fragrance: "Fragrance",
      beauty: "Beauty",
      accessories: "Accessories",
      bags: "Bags",

      printed: "Printed Wear",
      embroidered: "Embroidered Wear",
      party: "Party Wear",
      bridal: "Bridal Wear",
      perfume: "Perfume",
      cosmetics: "Cosmetics",
      jewellery: "Jewellery",
      skincare: "Skincare Products",

      // NAVBAR / FOOTER
      homes: "Home",
      products: "Products",
      abouts: "About",
      contacts: "Contact",
      howItWorkss: "How It Works",
      cart: "Cart",
      dashboard: "Dashboard",

     

      // TERMS PAGE
      termsTitle: "Terms & Conditions",

      terms1:
        "By using Etimad, you agree to abide by our marketplace rules and policies.",

      terms2:
        "Sellers are responsible for listing accurate product descriptions and delivering items as promised.",

      terms3:
        "Buyers agree to provide correct shipping information and complete payment for confirmed orders.",

      terms4:
        "Etimad acts as a trusted intermediary and holds payments securely until order completion.",

      terms5:
        "We reserve the right to suspend accounts involved in fraudulent activities.",

      // RETURN POLICY
      returnTitle: "Return Policy",

      return1:
        "Customers may request a return if the product received is damaged, defective, or significantly different from the listing.",

      return2:
        "Return requests should be initiated within 7 days of delivery.",

      return3:
        "Once the issue is verified, refunds are processed according to the original payment method.",

      return4:
        "Products that have been used or altered may not qualify for return.",

      // REVIEWS
      reviewsTitle: "Customer Reviews",

      reviewName1: "Ali Raza",
      reviewText1:
        "Etimad made online shopping much safer. Highly recommended!",

      reviewName2: "Sara Khan",
      reviewText2:
        "The escrow system gave me confidence to buy from new sellers.",

      reviewName3: "Usman Malik",
      reviewText3:
        "Great platform with smooth checkout and excellent support.",

      // HELP PAGE
      helpTitle: "Help Center",

      helpDesc:
        "Need assistance? Our support team is here to help with account issues, payments, returns, and disputes.",

      hours: "Hours",
 
      workingHours:
        "Monday – Saturday, 9:00 AM – 6:00 PM",

      
      footer: {
        information: "Information",
        contactUs: "Contact Us",
        phone: "0000-xxxxxxx",
        whatsapp: "+92-xxx-xxxxxxx",
        email: "customersupport@etimad.com",
        description:
          "Secure online marketplace with escrow protection for buyers and sellers across Pakistan.",
        copyright: "© {{year}} Etimad. All rights reserved.",

        links: {
          about: "About",
          paymentMethod: "Payment Method",
          termsConditions: "Terms & Conditions",
          returnPolicy: "Return Policy",
          reviews: "Reviews",
          help: "Help",
        },
      },
      howItWorks: {
  title: "How It Works",
  steps: [
    "Buyer places order",
    "Payment submitted",
    "Admin verifies escrow",
    "Seller ships product",
    "Buyer confirms delivery",
    "Admin releases funds"
  ]
},
contact: {
  badge: "Get In Touch",
  title: "Contact Us",
  description:
    "Need help with your order, payment, or seller account? Our support team is here to assist buyers and sellers across Pakistan.",
  callUs: "Call Us",
  email: "Email",
  whatsapp: "WhatsApp",
  office: "Office",

  formTitle: "Send Us a Message",
  formSubtitle: "We usually reply within 24 hours.",
  send: "Send Message",

  placeholders: {
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Write your message...",
  },
},
about: {
  badge: "About Etimad",
  title1: "Building Trust in",
  titleHighlight: "Online Commerce",

  description1:
    "Etimad is a secure escrow-based marketplace that protects both buyers and sellers. Payments are held safely until the buyer confirms successful delivery.",
  description2:
    "Our mission is to eliminate fraud and create a trustworthy environment where people can buy and sell with complete confidence.",

  stats: {
    protected: "Protected Transactions",
    support: "Customer Support",
  },

  featuresTitle: "Why Choose Etimad?",
  featuresSubtitle:
    "We provide a trusted escrow system that ensures safe transactions for everyone.",

  features: {
    secureEscrow: {
      title: "Secure Escrow",
      description:
        "Funds are safely held until the buyer confirms the product has been delivered successfully.",
    },
    trustedMarketplace: {
      title: "Trusted Marketplace",
      description:
        "We connect verified buyers and sellers to ensure smooth and reliable transactions.",
    },
    flexiblePayments: {
      title: "Flexible Payments",
      description:
        "Pay securely using Visa, JazzCash, or Cash on Delivery based on your preference.",
    },
    nationwideReach: {
      title: "Nationwide Reach",
      description:
        "Buy and sell confidently across Pakistan with secure delivery and escrow protection.",
    },
  },

  cta: {
    title: "Trade With Confidence",
    description:
      "Whether you're buying or selling, Etimad ensures your transactions are protected every step of the way.",
    button: "Start Shopping",
  },
},
payment: {
  title: "Payment Methods",
  description:
    "Etimad supports multiple payment options to make shopping convenient and secure for customers across Pakistan.",

  methods: [
    {
      title: "Visa / MasterCard",
      desc: "Pay securely online using your debit or credit card through our protected payment gateway.",
    },
    {
      title: "JazzCash",
      desc: "Complete your payment quickly using your JazzCash mobile wallet.",
    },
    {
      title: "Cash on Delivery (COD)",
      desc: "Pay in cash when your order is delivered to your doorstep.",
    },
  ],
},
returnPolicy: {
  title: "Return Policy",
  items: [
    "Customers may request a return if the product received is damaged, defective, or significantly different from the listing.",
    "Return requests should be initiated within 7 days of delivery.",
    "Once the issue is verified, refunds are processed according to the original payment method.",
    "Products that have been used or altered may not qualify for return."
  ]
},
reviews: {
  title: "Customer Reviews",
  items: [
    {
      name: "Ali Raza",
      text: "Etimad made online shopping much safer. Highly recommended!",
    },
    {
      name: "Sara Khan",
      text: "The escrow system gave me confidence to buy from new sellers.",
    },
    {
      name: "Usman Malik",
      text: "Great platform with smooth checkout and excellent support.",
    },
  ]
},
terms: {
  title: "Terms & Conditions",
  items: [
    "By using Etimad, you agree to abide by our marketplace rules and policies.",
    "Sellers are responsible for listing accurate product descriptions and delivering items as promised.",
    "Buyers agree to provide correct shipping information and complete payment for confirmed orders.",
    "Etimad acts as a trusted intermediary and holds payments securely until order completion.",
    "We reserve the right to suspend accounts involved in fraudulent activities."
  ]
},
help: {
  title: "Help Center",
  description:
    "Need assistance? Our support team is here to help with account issues, payments, returns, and disputes.",

  emailLabel: "Email",
  phoneLabel: "Phone",
  hoursLabel: "Hours",

  hours: "Monday – Saturday, 9:00 AM – 6:00 PM",

  
},
home: {
  howItWorksTitle: "How It Works",

  features: [
    {
      title: "Etimad Protection",
      desc: "Funds held until delivery confirmed.",
    },
    {
      title: "Verified Sellers",
      desc: "Trusted vendors and secure orders.",
    },
    {
      title: "Dispute Resolution",
      desc: "Admin mediation and refund support.",
    },
  ],

  steps: [
    "1. Order",
    "2. Pay to Etimad",
    "3. Seller Ships",
    "4. Funds Released",
  ],
},
auth: {
  signup: "Signup",
  login: "Login",
  register: "Register",
  loginButton: "Login",

  signupSuccess: "Registered successfully",
  loginFailed: "Login failed",
  error: "Something went wrong",

  placeholders: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
  },

  roles: {
    buyer: "Buyer",
    seller: "Seller",
  },
}
    }
  },

  ur: {
    translation: {
      auth: {
  signup: "سائن اپ",
  login: "لاگ ان",
  register: "رجسٹر کریں",
  loginButton: "لاگ ان کریں",

  signupSuccess: "کامیابی سے رجسٹر ہو گیا",
  loginFailed: "لاگ ان ناکام ہوگیا",
  error: "کچھ غلط ہو گیا",

  placeholders: {
    name: "نام",
    email: "ای میل",
    phone: "فون",
    password: "پاس ورڈ",
  },

  roles: {
    buyer: "خریدار",
    seller: "فروخت کنندہ",
  },
},
      home: {
  howItWorksTitle: "یہ کیسے کام کرتا ہے",

  features: [
    {
      title: "ایتماد پروٹیکشن",
      desc: "رقم اس وقت تک محفوظ رہتی ہے جب تک ڈیلیوری کی تصدیق نہ ہو جائے۔",
    },
    {
      title: "تصدیق شدہ سیلرز",
      desc: "قابل اعتماد فروخت کنندگان اور محفوظ آرڈرز۔",
    },
    {
      title: "تنازعات کا حل",
      desc: "ایڈمن کی مداخلت اور ریفنڈ سپورٹ۔",
    },
  ],

  steps: [
    "1. آرڈر کریں",
    "2. ایتماد کو ادائیگی کریں",
    "3. سیلر شپ کرتا ہے",
    "4. رقم جاری کی جاتی ہے",
  ],
},
      help: {
  title: "مدد مرکز",
  description:
    "کیا آپ کو مدد چاہیے؟ ہماری سپورٹ ٹیم اکاؤنٹ، ادائیگی، واپسی اور تنازعات میں آپ کی مدد کے لیے موجود ہے۔",

  emailLabel: "ای میل",
  phoneLabel: "فون",
  hoursLabel: "اوقات",

  hours: "پیر تا ہفتہ، صبح 9:00 بجے سے شام 6:00 بجے تک",

 
},
      terms: {
  title: "شرائط و ضوابط",
  items: [
    "ایتماد استعمال کرکے آپ ہمارے مارکیٹ پلیس کے قوانین اور پالیسیوں سے اتفاق کرتے ہیں۔",
    "فروخت کنندہ درست معلومات کے ساتھ پروڈکٹ درج کرنے اور وعدے کے مطابق ڈیلیوری کے ذمہ دار ہیں۔",
    "خریدار درست شپنگ معلومات فراہم کرنے اور آرڈر کی ادائیگی مکمل کرنے کے پابند ہیں۔",
    "ایتماد ایک قابل اعتماد ثالث کے طور پر کام کرتا ہے اور ادائیگی کو آرڈر مکمل ہونے تک محفوظ رکھتا ہے۔",
    "ہم فراڈ سرگرمیوں میں ملوث اکاؤنٹس کو معطل کرنے کا حق محفوظ رکھتے ہیں۔"
  ]
},
reviews: {
  title: "صارفین کے جائزے",
  items: [
    {
      name: "علی رضا",
      text: "ایتماد نے آن لائن خریداری کو بہت محفوظ بنا دیا۔ انتہائی سفارش کرتا ہوں!",
    },
    {
      name: "سارہ خان",
      text: "ایسکرو سسٹم نے مجھے نئے سیلرز سے خریداری کا اعتماد دیا۔",
    },
    {
      name: "عثمان ملک",
      text: "بہترین پلیٹ فارم، آسان چیک آؤٹ اور بہترین سپورٹ کے ساتھ۔",
    },
  ]
},
returnPolicy: {
  title: "واپسی کی پالیسی",
  items: [
    "اگر موصول شدہ پروڈکٹ خراب، ناقص یا لسٹنگ سے مختلف ہو تو صارف واپسی کی درخواست کر سکتا ہے۔",
    "واپسی کی درخواست ڈیلیوری کے 7 دن کے اندر دینی ہوگی۔",
    "مسئلہ تصدیق ہونے کے بعد رقم اصل ادائیگی کے طریقے کے مطابق واپس کی جاتی ہے۔",
    "استعمال شدہ یا تبدیل شدہ مصنوعات واپسی کے قابل نہیں ہوتیں۔"
  ]
},
      payment: {
  title: "ادائیگی کے طریقے",
  description:
    "ایتماد پاکستان بھر کے صارفین کے لیے آسان اور محفوظ خریداری کے لیے مختلف ادائیگی کے طریقے فراہم کرتا ہے۔",

  methods: [
    {
      title: "ویزا / ماسٹر کارڈ",
      desc: "ہمارے محفوظ گیٹ وے کے ذریعے ڈیبٹ یا کریڈٹ کارڈ سے آن لائن محفوظ ادائیگی کریں۔",
    },
    {
      title: "جاز کیش",
      desc: "اپنے جاز کیش موبائل والٹ کے ذریعے تیزی سے ادائیگی مکمل کریں۔",
    },
    {
      title: "کیش آن ڈیلیوری",
      desc: "اپنا آرڈر موصول ہونے پر نقد ادائیگی کریں۔",
    },
  ],
},
      about: {
  badge: "ایتماد کے بارے میں",
  title1: "اعتماد کی تعمیر",
  titleHighlight: "آن لائن تجارت میں",

  description1:
    "ایتماد ایک محفوظ ایسکرو بیسڈ مارکیٹ پلیس ہے جو خریدار اور فروخت کنندہ دونوں کو تحفظ فراہم کرتا ہے۔ ادائیگی اس وقت تک محفوظ رہتی ہے جب تک خریدار ڈیلیوری کی تصدیق نہ کرے۔",
  description2:
    "ہمارا مقصد دھوکہ دہی کو ختم کرنا اور ایک ایسا قابل اعتماد ماحول بنانا ہے جہاں لوگ اعتماد کے ساتھ خرید و فروخت کر سکیں۔",

  stats: {
    protected: "محفوظ لین دین",
    support: "کسٹمر سپورٹ",
  },

  featuresTitle: "ایتماد کیوں منتخب کریں؟",
  featuresSubtitle:
    "ہم ایک قابل اعتماد ایسکرو سسٹم فراہم کرتے ہیں جو سب کے لیے محفوظ لین دین کو یقینی بناتا ہے۔",

  features: {
    secureEscrow: {
      title: "محفوظ ایسکرو",
      description:
        "رقم اس وقت تک محفوظ رہتی ہے جب تک خریدار پروڈکٹ کی کامیاب ڈیلیوری کی تصدیق نہ کرے۔",
    },
    trustedMarketplace: {
      title: "قابل اعتماد مارکیٹ پلیس",
      description:
        "ہم تصدیق شدہ خریداروں اور فروخت کنندگان کو جوڑتے ہیں تاکہ محفوظ اور ہموار لین دین ہو سکے۔",
    },
    flexiblePayments: {
      title: "آسان ادائیگی کے طریقے",
      description:
        "ویزا، جاز کیش یا کیش آن ڈیلیوری کے ذریعے محفوظ ادائیگی کریں۔",
    },
    nationwideReach: {
      title: "پورے پاکستان میں دستیابی",
      description:
        "پورے پاکستان میں اعتماد کے ساتھ خرید و فروخت کریں اور محفوظ ڈیلیوری حاصل کریں۔",
    },
  },

  cta: {
    title: "اعتماد کے ساتھ تجارت کریں",
    description:
      "چاہے آپ خریدار ہوں یا فروخت کنندہ، ایتماد آپ کے ہر لین دین کو محفوظ بناتا ہے۔",
    button: "خریداری شروع کریں",
  },
}, 
      contact: {
  badge: "رابطہ کریں",
  title: "ہم سے رابطہ کریں",
  description:
    "کیا آپ کو آرڈر، ادائیگی یا سیلر اکاؤنٹ میں مدد چاہیے؟ ہماری سپورٹ ٹیم پاکستان بھر کے خریداروں اور فروخت کنندگان کی مدد کے لیے موجود ہے۔",
  callUs: "ہمیں کال کریں",
  email: "ای میل",
  whatsapp: "واٹس ایپ",
  office: "دفتر",

  formTitle: "پیغام بھیجیں",
  formSubtitle: "ہم عام طور پر 24 گھنٹوں میں جواب دیتے ہیں۔",
  send: "پیغام بھیجیں",

  placeholders: {
    name: "آپ کا نام",
    email: "آپ کا ای میل",
    subject: "موضوع",
    message: "اپنا پیغام لکھیں...",
  },
},
      howItWorks: {
  title: "یہ کیسے کام کرتا ہے",
  steps: [
    "خریدار آرڈر کرتا ہے",
    "ادائیگی جمع کروائی جاتی ہے",
    "ایڈمن ایسکرو کی تصدیق کرتا ہے",
    "فروخت کنندہ پروڈکٹ بھیجتا ہے",
    "خریدار ڈیلیوری کی تصدیق کرتا ہے",
    "ایڈمن رقم جاری کرتا ہے"
  ]
},
      
      login: "لاگ ان",
      signup: "سائن اپ",
      register: "رجسٹر",

      name: "نام",
      email: "ای میل",
      phone: "فون نمبر",
      password: "پاس ورڈ",

      buyer: "خریدار",
      seller: "فروخت کنندہ",

      search: "تلاش کریں",
      searchProducts: "مصنوعات تلاش کریں...",
      changeLang: "زبان تبدیل کریں",

      apparels: "ملبوسات",
      fragrance: "خوشبو",
      beauty: "خوبصورتی",
      accessories: "لوازمات",
      bags: "بیگز",

      printed: "پرنٹڈ کپڑے",
      embroidered: "کڑھائی والے کپڑے",
      party: "پارٹی ویئر",
      bridal: "برائیڈل ویئر",
      perfume: "پرفیوم",
      cosmetics: "کاسمیٹکس",
      jewellery: "زیورات",
      skincare: "جلد کی دیکھ بھال کی اشیا",

      // NAVBAR / FOOTER
      homes: "ہوم",
      products: "مصنوعات",
      abouts: "ہمارے بارے میں",
      contacts: "رابطہ",
      howItWorkss: "یہ کیسے کام کرتا ہے",
      cart: "کارٹ",
      dashboard: "ڈیش بورڈ",

      
      supportText:
        "ہماری سپورٹ ٹیم آپ کی مدد کے لیے موجود ہے۔",
      contactSupport: "سپورٹ سے رابطہ کریں",

      // PAYMENT
      paymentMethods: "ادائیگی کے طریقے",
      paymentMethodsDesc:
        "ایتماد پاکستان بھر کے صارفین کے لیے محفوظ ادائیگی کے مختلف طریقے فراہم کرتا ہے۔",

      visaMaster: "ویزا / ماسٹر کارڈ",
      visaMasterDesc:
        "اپنے ڈیبٹ یا کریڈٹ کارڈ سے محفوظ ادائیگی کریں۔",

      jazzcash: "جاز کیش",
      jazzcashDesc:
        "جاز کیش موبائل والیٹ کے ذریعے آسان ادائیگی کریں۔",

      cod: "کیش آن ڈیلیوری",
      codDesc:
        "آرڈر وصول ہونے پر نقد ادائیگی کریں۔",

      // TERMS
      termsTitle: "شرائط و ضوابط",

      terms1:
        "ایتماد استعمال کرتے ہوئے آپ ہماری پالیسیز سے اتفاق کرتے ہیں۔",

      terms2:
        "فروخت کنندگان درست معلومات فراہم کرنے کے پابند ہیں۔",

      terms3:
        "خریدار درست معلومات اور ادائیگی فراہم کریں گے۔",

      terms4:
        "ایتماد ادائیگی کو محفوظ رکھتا ہے جب تک آرڈر مکمل نہ ہو۔",

      terms5:
        "فراڈ میں ملوث اکاؤنٹس معطل کیے جا سکتے ہیں۔",

      // RETURN
      returnTitle: "واپسی کی پالیسی",

      return1:
        "خراب یا غلط مصنوعات کی واپسی کی درخواست دی جا سکتی ہے۔",

      return2:
        "واپسی کی درخواست 7 دن کے اندر دی جانی چاہیے۔",

      return3:
        "تصدیق کے بعد رقم واپس کر دی جائے گی۔",

      return4:
        "استعمال شدہ مصنوعات واپسی کے قابل نہیں ہوں گی۔",

      // REVIEWS
      reviewsTitle: "صارفین کے تاثرات",

      reviewName1: "علی رضا",
      reviewText1:
        "ایتماد نے آن لائن خریداری کو محفوظ بنا دیا۔",

      reviewName2: "سارہ خان",
      reviewText2:
        "اسکرو سسٹم نے مجھے اعتماد دیا۔",

      reviewName3: "عثمان ملک",
      reviewText3:
        "بہترین پلیٹ فارم اور زبردست سپورٹ۔",

      // HELP
      helpTitle: "ہیلپ سینٹر",

      helpDesc:
        "اکاؤنٹ، ادائیگی یا آرڈر مسائل کے لیے ہماری سپورٹ ٹیم سے رابطہ کریں۔",

      hours: "اوقات",

      workingHours:
        "پیر تا ہفتہ، صبح 9 بجے تا شام 6 بجے",

      
      footer: {
        information: "معلومات",
        contactUs: "ہم سے رابطہ کریں",
        phone: "0000-xxxxxxx",
        whatsapp: "+92-xxx-xxxxxxx",
        email: "customersupport@etimad.com",
        description:
          "ایک محفوظ آن لائن مارکیٹ پلیس جہاں پاکستان بھر کے خریداروں اور فروخت کنندگان کے لیے ایسکرو تحفظ موجود ہے۔",
        copyright: "© {{year}} ایتماد۔ جملہ حقوق محفوظ ہیں۔",

        links: {
          about: "ہمارے بارے میں",
          paymentMethod: "ادائیگی کا طریقہ",
          termsConditions: "شرائط و ضوابط",
          returnPolicy: "واپسی کی پالیسی",
          reviews: "جائزے",
          help: "مدد",
        },
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
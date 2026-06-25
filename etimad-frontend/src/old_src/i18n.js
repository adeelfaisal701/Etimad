import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      signup: "Sign Up",
      search: "Search...",
      changeLang: "Change Language",

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
      bags: "Bags",
      skincare: "Skincare Products",

      // NAVBAR / FOOTER
      home: "Home",
      products: "Products",
      about: "About",
      contact: "Contact",
      howItWorks: "How It Works",
      cart: "Cart",
      dashboard: "Dashboard",

      // FAQ PAGE
      faqTitle: "Frequently Asked Questions",
      faqSubtitle:
        "Find answers to common questions about shopping, selling, payments, and order protection on Etimad.",

      faqQ1: "How does Etimad work?",
      faqA1:
        "Etimad is a secure online marketplace where buyers can shop from trusted sellers. Payments are protected and released to sellers only after the buyer confirms receiving the order.",

      faqQ2: "How is my payment protected?",
      faqA2:
        "Your payment is held securely until your order is delivered and marked as completed. This ensures that sellers are paid only after successful delivery.",

      faqQ3: "What payment methods are available?",
      faqA3:
        "We currently support Visa card payments, JazzCash, and Cash on Delivery (COD) for customers in Pakistan.",

      faqQ4: "How are sellers charged?",
      faqA4:
        "Sellers are charged a small commission on each completed order. The commission is calculated based on order amount according to Etimad's commission slabs.",

      faqQ5: "Can I return or dispute an order?",
      faqA5:
        "Yes. If there is an issue with your order, you can contact support or raise a dispute before marking the order as completed.",

      faqQ6: "How do I become a seller?",
      faqA6:
        "Click on the Signup button, choose Seller as your account type, and complete your registration. Once approved, you can start listing products.",

      stillQuestions: "Still Have Questions?",
      supportText:
        "Our support team is here to help you with any questions or concerns.",
      contactSupport: "Contact Support",

      // PAYMENT PAGE
      paymentMethods: "Payment Methods",
      paymentMethodsDesc:
        "Etimad supports multiple payment options to make shopping convenient and secure for customers across Pakistan.",

      visaMaster: "Visa / MasterCard",
      visaMasterDesc:
        "Pay securely online using your debit or credit card through our protected payment gateway.",

      jazzcash: "JazzCash",
      jazzcashDesc:
        "Complete your payment quickly using your JazzCash mobile wallet.",

      cod: "Cash on Delivery (COD)",
      codDesc:
        "Pay in cash when your order is delivered to your doorstep.",

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

      email: "Email",
      phone: "Phone",
      hours: "Hours",

      workingHours:
        "Monday – Saturday, 9:00 AM – 6:00 PM",

    
    }
  },

  ur: {
    translation: {
      login: "لاگ ان",
      signup: "سائن اپ",
      search: "تلاش کریں",
      changeLang: "زبان تبدیل کریں",

    


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
      bags: "بیگز",
      skincare: "جلد کی دیکھ بھال کی اشیا",

      // NAVBAR / FOOTER
      home: "ہوم",
      products: "مصنوعات",
      about: "ہمارے بارے میں",
      contact: "رابطہ",
      howItWorks: "یہ کیسے کام کرتا ہے",
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

      email: "ای میل",
      phone: "فون",
      hours: "اوقات",

      workingHours:
        "پیر تا ہفتہ، صبح 9 بجے تا شام 6 بجے",

      visitFaq: "FAQ دیکھیں"
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
(function () {
  const STORAGE_KEY = "myclinicLang";
  const dictionary = {
    "Find a Doctor": "الأطباء",
    "Specialties": "التخصصات",
    "Programs": "البرامج",
    "Telemedicine": "عن بُعد",
    "Home Healthcare": "الرعاية المنزلية",
    "Book Now": "احجز الآن",
    "Book an appointment": "احجز موعداً",
    "Book in 60 seconds →": "احجز خلال 60 ثانية ←",
    "Call 920022811": "اتصل على 920022811",
    "Call Center · Extended hours": "مركز الاتصال · ساعات عمل ممتدة",
    "· Sat–Thu 8 AM – 10 PM · Fri 5 PM – 9 PM": "· السبت - الخميس 8 صباحاً - 10 مساءً · الجمعة 5 مساءً - 9 مساءً",
    "Contact Us": "اتصل بنا",
    "Careers": "الوظائف",
    "WhatsApp · 0542228111": "واتساب · 0542228111",
    "Now open": "نستقبلكم الآن",
    "5 branches · Jeddah, Riyadh": "5 فروع · جدة والرياض",
    "Company": "الشركة",
    "Care": "الرعاية",
    "Useful Links": "روابط مفيدة",
    "Call Center Working Hours": "ساعات عمل مركز الاتصال",
    "Our Branches": "فروعنا",
    "Get the app": "حمّل التطبيق",
    "About My Clinic": "عن ماي كلينك",
    "Our Sites": "مواقعنا",
    "Services": "الخدمات",
    "Privacy Policy": "سياسة الخصوصية",
    "Saturday – Thursday · 8 AM – 10 PM": "السبت - الخميس · 8 صباحاً - 10 مساءً",
    "Friday · 5 PM – 9 PM": "الجمعة · 5 مساءً - 9 مساءً",
    "Jeddah · Al Mohammadiyah": "جدة · المحمدية",
    "Jeddah · Al Safa": "جدة · الصفا",
    "Jeddah · Al Khalidiyyah Dental": "جدة · الخالدية للأسنان",
    "Jeddah · Tahlia": "جدة · التحلية",
    "Riyadh · Al Sahafa": "الرياض · الصحافة",
    "Jeddah Al Mohammadiyah": "جدة المحمدية",
    "Jeddah Al Safa": "جدة الصفا",
    "Jeddah Al Khalidiyyah Dental Center": "جدة مركز الخالدية للأسنان",
    "Riyadh Al Sahafa": "الرياض الصحافة",
    "Jeddah Tahlia": "جدة التحلية",
    "Jeddah Obhour": "جدة أبحر",
    "Jeddah Al Khalidiyyah": "جدة الخالدية",
    "Jeddah Al Mohammadiyah + Dental Center": "جدة المحمدية + مركز الأسنان",
    "Jeddah Al Mohammadiyah + Obhour": "جدة المحمدية + أبحر",
    "App Store": "آب ستور",
    "Google Play": "جوجل بلاي",
    "My Clinic is your partner in health and wellness. With a focus on prevention and early intervention, our team of experts is committed to helping you stay healthy and live your best life.": "ماي كلينك شريكك في الصحة والعافية، بخدمات وقائية وتشخيص مبكر وفريق طبي متخصص يساعدك على صحة أفضل.",
    "© My Clinic 2026 · All rights reserved · CBAHI Accredited": "© ماي كلينك 2026 · جميع الحقوق محفوظة · معتمد من سباهي",
    "Our team is": "فريقنا",
    "ready": "جاهز",
    "to serve you.": "لخدمتكم.",
    "Our team is <em>ready</em><br>to serve you.": "فريقنا <em>جاهز</em><br>لخدمتكم.",
    "The right physician<br>for <em>your question</em>.": "الطبيب المناسب<br>لـ <em>سؤالك الصحي</em>.",
    "Clinical care delivered<br>in the comfort of <em>home</em>.": "رعاية طبية تصل إليك<br>في راحة <em>منزلك</em>.",
    "Find your doctor": "ابحث عن طبيبك",
    "Home Healthcare": "الرعاية المنزلية",
    "Connect with a diverse range of experienced healthcare professionals. Browse profiles, read patient reviews, and choose the doctor who resonates with your needs.": "تواصل مع نخبة من الأطباء ذوي الخبرة. تصفح الملفات واختر الطبيب الأنسب لاحتياجك.",
    "Receive compassionate doctor visits, nursing support, physiotherapy, and follow-up care at home from our certified mobile clinical team.": "احصل في منزلك على زيارات الأطباء والتمريض والعلاج الطبيعي والمتابعة من فريقنا الطبي المتنقل المعتمد.",
    "“The booking was easy, the nurse was courteous, the waiting time was short.” — Patient testimonial": "كان الحجز سهلاً، والتمريض متعاوناً، ووقت الانتظار قصيراً. - تجربة مريض",
    "“Professional care, delivered with comfort and dignity at home.”": "رعاية احترافية تصل إلى المنزل براحة وكرامة.",
    "Find a doctor": "ابحث عن طبيب",
    "View specialties": "عرض التخصصات",
    "Request home care": "اطلب الرعاية المنزلية",
    "We've extended our call center hours. Saturday through Thursday, 8 AM to 10 PM — and Friday 5 PM to 9 PM. Call 920022811 or book online in seconds.": "مددنا ساعات عمل مركز الاتصال. من السبت إلى الخميس من 8 صباحاً حتى 10 مساءً، ويوم الجمعة من 5 مساءً حتى 9 مساءً. اتصل على 920022811 أو احجز إلكترونياً خلال ثوانٍ.",
    "From our patients": "من مرضانا",
    "“Your partner in health and wellness, across the Kingdom.”": "شريكك في الصحة والعافية في أنحاء المملكة.",
    "01 · Call center": "01 · مركز الاتصال",
    "02 · Find a doctor": "02 · ابحث عن طبيب",
    "03 · Home healthcare": "03 · الرعاية المنزلية",
    "Branch": "الفرع",
    "All branches": "كل الفروع",
    "Specialty": "التخصص",
    "All specialties": "كل التخصصات",
    "Doctor": "الطبيب",
    "All Doctors": "كل الأطباء",
    "Search": "بحث",
    "Specialized care,": "رعاية متخصصة،",
    "connected around you": "متكاملة حولك",
    "Specialized care, connected around you.": "رعاية متخصصة، متكاملة حولك.",
    "From cardiology to obstetrics, our specialists work as one team — sharing notes, rooms, and rounds so your care never feels handed off.": "من القلب إلى النساء والولادة، يعمل أطباؤنا كفريق واحد يتبادل الملاحظات والخطط العلاجية لتبقى رعايتك متصلة وواضحة.",
    "View all specialties": "عرض كل التخصصات",
    "View all": "عرض كل",
    "specialties": "التخصصات",
    "Heart care, diagnostics & prevention": "رعاية القلب والتشخيص والوقاية",
    "Whole-body adult primary care": "رعاية أولية شاملة للبالغين",
    "Comprehensive metabolic program": "برنامج شامل لصحة الأيض",
    "Hearing, breathing, balance": "السمع والتنفس والتوازن",
    "One doctor for the whole family": "طبيب واحد لكل أفراد العائلة",
    "Eye care & full surgical suite": "رعاية العيون وجراحاتها",
    "Bones, joints & mobility": "العظام والمفاصل والحركة",
    "Women's health": "صحة المرأة",
    "Programs that take care of": "برامج ترعى",
    "the whole journey": "رحلتك كاملة",
    "Multi-disciplinary programs combining specialists, technology, and ongoing coaching — designed for life's important chapters.": "برامج متعددة التخصصات تجمع بين الأطباء والتقنية والمتابعة المستمرة، مصممة للمراحل المهمة في حياتك.",
    "View all programs": "عرض كل البرامج",
    "Program 01": "برنامج 01",
    "Program 02": "برنامج 02",
    "Program 03": "برنامج 03",
    "Program 04": "برنامج 04",
    "Program 05": "برنامج 05",
    "Program 06": "برنامج 06",
    "12 weeks": "12 أسبوعاً",
    "40 weeks": "40 أسبوعاً",
    "Ongoing": "مستمر",
    "Lifelong": "مدى الحياة",
    "26 weeks": "26 أسبوعاً",
    "0–6 years": "0-6 سنوات",
    "Diabetes Management": "إدارة السكري",
    "Adult & Pediatric": "للبالغين والأطفال",
    "Adult and pediatric pathways. Personal endocrinologist, dietician, and continuous monitoring.": "مسارات للبالغين والأطفال، مع طبيب غدد وتغذية ومتابعة مستمرة.",
    "Learn more →": "اعرف المزيد ←",
    "Pregnancy": "الحمل",
    "Care Program": "برنامج الرعاية",
    "From early antenatal visits through postnatal support — a single OB-GYN team across every trimester.": "من الزيارات الأولى للحمل إلى دعم ما بعد الولادة، مع فريق نساء وولادة واحد طوال المراحل.",
    "Family Center": "مركز العائلة",
    "One pediatric and family medicine team for every member of the household.": "فريق طب أطفال وطب أسرة لكل فرد من أفراد المنزل.",
    "Hearing Aid": "السماعات الطبية",
    "Program": "البرنامج",
    "Audiology testing, fitting, calibration, and long-term hearing care across all ages.": "اختبارات السمع، والتركيب، والضبط، ورعاية السمع طويلة المدى لكل الأعمار.",
    "Osteoporosis": "هشاشة العظام",
    "DEXA, endocrine workup, and bone-strengthening protocols tailored to your stage.": "فحص DEXA وتقييم الغدد وخطط تقوية العظام حسب حالتك.",
    "Pediatric": "الأطفال",
    "Vaccination Program": "برنامج التطعيمات",
    "Saudi MoH schedule, gentle technique, and digital records that travel with your child.": "جدول وزارة الصحة السعودية، أسلوب لطيف، وسجلات رقمية ترافق طفلك.",
    "Ready to begin": "جاهز لبدء",
    "your care journey": "رحلة رعايتك",
    "Ready to begin your care journey?": "جاهز لبدء رحلة رعايتك؟",
    "Choose the service that fits your needs today. Book with a specialist, explore our clinical programs, or speak with our team for guidance.": "اختر الخدمة الأنسب لاحتياجك اليوم. احجز مع طبيب مختص، استكشف برامجنا الطبية، أو تحدث مع فريقنا للإرشاد.",
    "Explore programs": "استكشف البرامج",
    "Caring for families across the Kingdom since 2009": "نرعى العائلات في المملكة منذ 2009",
    "Branches in Jeddah & Riyadh, plus tele- and home care": "فروع في جدة والرياض، مع رعاية عن بعد ومنزلية",
    "Board-certified physicians across 24 specialties": "أطباء معتمدون في 24 تخصصاً",
    "Patients seen in 2025 — and counting": "مراجعون في 2025 وما زال العدد ينمو",
    "Find Your Doctor": "ابحث عن طبيبك",
    "Our service connects you with a diverse range of experienced healthcare professionals, each dedicated to your well-being. Browse profiles and choose the doctor who resonates with your needs — whether you're seeking a specialist or a primary care physician.": "نوصلك بنخبة واسعة من الأطباء ذوي الخبرة. تصفح الملفات واختر الطبيب الأنسب لاحتياجك، سواء كنت تبحث عن استشاري أو طبيب رعاية أولية.",
    "Any branch": "أي فرع",
    "Any specialty": "أي تخصص",
    "Search physicians": "ابحث عن الأطباء",
    "Access quality medical care from your own comfort through our telemedicine service. Connect with healthcare professionals via video consultations, saving time and ensuring convenience. Stay healthy with virtual visits that bring healthcare to you.": "احصل على رعاية طبية موثوقة من مكانك عبر خدمة الاستشارة عن بعد، وتواصل مع الأطباء بالفيديو لتوفير الوقت والوصول للرعاية بسهولة.",
    "Bringing care": "نقدم الرعاية",
    "to your doorstep.": "حتى باب منزلك.",
    "Experience the convenience of home healthcare as our professionals provide you with home care that includes doctor and nurse visits. Revitalize your health — we also provide physiotherapy expertise at the comfort of your home.": "استفد من راحة الرعاية المنزلية مع زيارات الأطباء والتمريض، إضافة إلى خدمات العلاج الطبيعي في منزلك.",
    "Contact us →": "تواصل معنا ←",
    "Our Branches": "فروعنا",
    "Select Your": "اختر",
    "Location": "موقعك",
    "Whichever branch you visit, your records, your physician notes, and your imaging follow you — seamlessly.": "أياً كان الفرع الذي تزوره، تنتقل سجلاتك وملاحظات طبيبك وصورك الطبية بسلاسة.",
    "Patient Testimonial": "تجربة مريض",
    "In our patients'": "بكلمات",
    "own words": "مرضانا",
    "The booking was easy, the nurse was courteous, the waiting time was short, and I entered my appointment on time. May God grant them good health.": "كان الحجز سهلاً، والممرضة متعاونة، ووقت الانتظار قصيراً، ودخلت موعدي في الوقت المحدد. الله يعطيهم العافية.",
    "Patient · Jeddah Al Safa": "مريضة · جدة الصفا",
    "More from patients": "آراء أخرى من المرضى",
    "More than great. Classy treatment, fast service, cleanliness. May God grant you success.": "أكثر من رائع. تعامل راقٍ، خدمة سريعة، ونظافة. الله يوفقكم.",
    "Dr. Reem was patient, thorough, and explained every step of my diabetes plan. I'm grateful.": "كانت د. ريم صبورة ودقيقة وشرحت كل خطوة في خطة السكري. ممتن لها.",
    "The home nurse came on time, was professional and warm. Made my recovery so much easier.": "وصلت ممرضة الرعاية المنزلية في الوقت، وكانت محترفة ولطيفة. سهّلت علي التعافي كثيراً.",
    "News & Announcements": "الأخبار والإعلانات",
    "News &": "الأخبار و",
    "Announcements": "الإعلانات",
    "Stay informed with our latest updates, news and announcements.": "تابع آخر أخبارنا وتحديثاتنا وإعلاناتنا.",
    "Learn more": "اعرف المزيد",
    "Research · May 2026": "بحث · مايو 2026",
    "\"Breaking Barriers in Healthcare\" — Unleashing innovation at My Clinic's First Annual Scientific Conference.": "\"كسر الحواجز في الرعاية الصحية\" - إطلاق الابتكار في المؤتمر العلمي السنوي الأول لماي كلينك.",
    "8 min read · Dr. Layla Al-Rashed": "قراءة 8 دقائق · د. ليلى الراشد",
    "Community · Apr 2026": "المجتمع · أبريل 2026",
    "Winners of Jeddah United — celebrated in style at the My Clinic Winners Ceremony.": "الفائزون من جدة يونايتد، احتفال مميز في حفل ماي كلينك للفائزين.",
    "3 min read": "قراءة 3 دقائق",
    "Accreditation · Mar 2026": "الاعتماد · مارس 2026",
    "CBAHI accreditation awarded to My Clinic Al Safa.": "حصول ماي كلينك الصفا على اعتماد سباهي.",
    "2 min read": "قراءة دقيقتين",
    "My Clinic app": "تطبيق ماي كلينك",
    "Download": "حمّل",
    "our app": "تطبيقنا",
    "Stay connected with your healthcare needs on the go. With our app, you can easily schedule appointments, access medical records, lab results, X-rays, receive personalized health tips, and connect with healthcare professionals from the comfort of your own device.": "ابقَ قريباً من احتياجاتك الصحية أينما كنت. عبر التطبيق يمكنك حجز المواعيد، الاطلاع على السجلات الطبية ونتائج المختبر والأشعة، واستلام نصائح صحية والتواصل مع المختصين بسهولة.",
    "Download on the": "حمّله من",
    "Get it on": "احصل عليه من",
    "Aurora Medical Directory": "دليل ماي كلينك الطبي",
    "Find Your": "ابحث عن",
    "Doctor": "طبيبك",
    "Find Your Doctor.": "ابحث عن طبيبك.",
    "Search profiles and book clinical consultation sessions instantly. Connect with our network of experienced healthcare specialists.": "تصفح ملفات الأطباء واحجز موعدك بسهولة مع نخبة من الاستشاريين والأخصائيين في فروع ماي كلينك.",
    "Search Doctor": "ابحث عن طبيب",
    "Branch Location": "موقع الفرع",
    "Clinical Specialty": "التخصص الطبي",
    "All Locations": "كل الفروع",
    "All Specialties": "كل التخصصات",
    "Choose a branch": "اختر الفرع",
    "Choose a specialty": "اختر التخصص",
    "Showing": "عرض",
    "doctors matching your filters": "طبيباً مطابقاً للفلاتر",
    "Search specialty, keyword, or treatment...": "ابحث عن تخصص أو كلمة أو خدمة علاجية...",
    "Find Doctors": "اعرض الأطباء",
    "Reset Search Filters": "إعادة ضبط البحث",
    "No Doctors Found": "لا توجد نتائج",
    "No Specialists Found": "لا توجد نتائج",
    "Book Consultation": "حجز استشارة",
    "Patient Information": "بيانات المريض",
    "Full Name": "الاسم الكامل",
    "Mobile Number": "رقم الجوال",
    "Back": "رجوع",
    "Confirm Appointment": "تأكيد الموعد",
    "Close Directory": "إغلاق الدليل",
    "Booking Confirmed!": "تم تأكيد الحجز",
    "View Profile": "عرض الملف",
    "Book": "احجز",
    "Expert Medical Care": "رعاية طبية متخصصة",
    "Connect with our team of board-certified clinical specialists. Combining world-class diagnostic expertise with advanced medical facilities to address all your healthcare needs.": "تواصل مع فريقنا من الأطباء المعتمدين، حيث نجمع بين الخبرة التشخيصية العالمية والمرافق الطبية المتقدمة لتلبية احتياجاتك الصحية.",
    "clinical specialties": "التخصصات الطبية",
    "Select Your Location": "اختر موقعك",
    "A Holistic Wellness Approach": "نهج متكامل للعافية",
    "Healthcare": "الرعاية الصحية",
    "Our healthcare programs offer an innovative approach to wellness with a focus on prevention, education, and empowerment. Our team of dedicated professionals provide personalized care using cutting-edge technology to meet the unique needs of each individual. Join us on the journey towards better health and a brighter future.": "تقدم برامجنا الصحية نهجاً مبتكراً للعافية يركز على الوقاية والتثقيف والتمكين. يقدم فريقنا رعاية شخصية باستخدام أحدث التقنيات لتلبية احتياجات كل فرد.",
    "Guiding Your Journey to Better Diabetes Control and Prevention.": "نرشد رحلتك لتحكم أفضل بالسكري والوقاية منه.",
    "Care Program": "برنامج الرعاية",
    "Discover Personalized Care at Our Family Medicine Center.": "اكتشف رعاية شخصية في مركز طب الأسرة.",
    "A bridge to a more vibrant and engaged world.": "جسر لعالم أكثر تواصلاً وحيوية.",
    "Battling Osteoporosis Together for Bone Strength.": "نواجه هشاشة العظام معاً لقوة عظام أفضل.",
    "Birth to 6 Yrs": "من الولادة حتى 6 سنوات",
    "Pediatric Vaccination": "تطعيمات الأطفال",
    "Guardians of Tomorrow’s Health through Immunization.": "نحمي صحة الغد من خلال التطعيم.",
    "Pregnancy Care": "رعاية الحمل",
    "New Beginnings with Expert Pregnancy Care.": "بدايات جديدة مع رعاية حمل متخصصة.",
    "Digital Healthcare Delivery": "رعاية صحية رقمية",
    "Virtual Care.": "رعاية افتراضية.",
    "Real doctors.": "أطباء حقيقيون.",
    "Connect with our board-certified medical and surgical consultants from the comfort of your home, office, or while traveling. High-definition video consultations, digital prescriptions, and continuous care coordination in just a few taps.": "تواصل مع استشاريينا المعتمدين في الطب والجراحة من منزلك أو مكتبك أو أثناء السفر. استشارات فيديو عالية الجودة، وصفات رقمية، وتنسيق مستمر للرعاية بخطوات بسيطة.",
    "Book Virtual Consultation": "احجز استشارة افتراضية",
    "See How It Works": "كيف تعمل الخدمة",
    "Virtual Benefits": "مزايا الرعاية الافتراضية",
    "Clinical Care Redefined for": "رعاية طبية تناسب",
    "Modern Life": "الحياة الحديثة",
    "Skip the Commute & Waiting": "تجنب التنقل والانتظار",
    "No traffic, no parking hassles, and no clinic waiting rooms. Complete your regular specialist follow-ups and diagnostic reviews online in a peaceful environment.": "لا ازدحام ولا مواقف ولا انتظار في العيادة. أنجز متابعاتك ومراجعات نتائجك مع المختصين عبر الإنترنت براحة.",
    "Secure & Encrypted": "آمن ومشفّر",
    "Your privacy is absolute. Our telemedicine platform runs on end-to-end encrypted video architecture and complies with strict local regulatory guidelines for digital health records.": "خصوصيتك أولوية. تعمل منصة الاستشارة عن بعد بتشفير كامل للفيديو وتلتزم بالأنظمة المحلية للسجلات الصحية الرقمية.",
    "Digital Prescriptions": "وصفات رقمية",
    "Get electronic prescriptions (e-prescriptions) sent straight to your phone and shared with our pharmacy partners instantly for delivery or nearby pick-up.": "تصلك الوصفات الإلكترونية مباشرة إلى هاتفك ويمكن مشاركتها مع شركائنا من الصيدليات للتوصيل أو الاستلام.",
    "Seamless Diagnostics Continuity": "استمرارية سلسة للتشخيص",
    "If your virtual consultation requires a physical laboratory assessment or diagnostic scan, your doctor instantly places the referral order. Visit any of our branches anytime for swift tests.": "إذا احتاجت الاستشارة إلى تحاليل أو أشعة، يرسل الطبيب الطلب فوراً ويمكنك زيارة أي فرع لإجرائها بسرعة.",
    "Three Simple Steps": "ثلاث خطوات بسيطة",
    "How Your Virtual": "كيف تتم",
    "Visit Works": "زيارتك الافتراضية",
    "Choose Specialist": "اختر المختص",
    "Browse our directory of board-certified consultants. Filter for specialties that offer telemedicine video calls.": "تصفح دليل الاستشاريين المعتمدين واختر التخصصات المتاحة للاستشارة بالفيديو.",
    "Confirm Your Slot": "أكد موعدك",
    "Pick a convenient virtual consultation hour, complete the registration, and confirm your booking online.": "اختر وقتاً مناسباً للاستشارة الافتراضية، أكمل التسجيل، وأكد الحجز إلكترونياً.",
    "Connect via Video": "تواصل بالفيديو",
    "Tap the secure video consultation link in your SMS confirmation on any device to instantly join your doctor.": "اضغط على رابط الفيديو الآمن في رسالة التأكيد للدخول إلى موعدك من أي جهاز.",
    "Virtual Specialists": "أطباء الاستشارة الافتراضية",
    "Book a remote consultation with our experienced clinical department consultants.": "احجز استشارة عن بعد مع استشاريي أقسامنا الطبية.",
    "Common Questions About": "أسئلة شائعة حول",
    "Virtual Consultations": "الاستشارات الافتراضية",
    "What technical devices do I need?": "ما الأجهزة التي أحتاجها؟",
    "Any standard smartphone, tablet, or computer equipped with a functional camera, microphone, and stable internet connection is fully supported. No application downloads are required; the secure session launches directly inside your web browser.": "يمكنك استخدام أي هاتف ذكي أو جهاز لوحي أو كمبيوتر مزود بكاميرا وميكروفون واتصال إنترنت مستقر. لا تحتاج إلى تحميل تطبيق، فالجلسة تفتح مباشرة عبر المتصفح.",
    "Are virtual consults covered by medical insurance?": "هل تغطي شركات التأمين الاستشارات الافتراضية؟",
    "Yes, many corporate and private medical insurance policies within the Kingdom cover virtual telemedicine consultations identically to standard physical clinic consults. You can verify your specific insurance coverage network during checkout or by contacting our 24/7 billing support line.": "نعم، العديد من وثائق التأمين تغطي الاستشارات الافتراضية مثل زيارات العيادة. يمكنك التحقق من التغطية أثناء الحجز أو عبر خدمة الفوترة.",
    "How do I receive prescribed medications?": "كيف أستلم الأدوية الموصوفة؟",
    "Following your session, the consultant will generate a digital prescription sent straight to your phone via SMS. You can redeem this electronic barcode at any major pharmacy branch across Saudi Arabia, or coordinate home delivery via our clinical pharmacy team.": "بعد الجلسة، يصدر الاستشاري وصفة رقمية تصلك برسالة نصية. يمكنك صرفها من الصيدليات أو تنسيق التوصيل المنزلي.",
    "What if the doctor requests a physical lab or blood test?": "ماذا لو طلب الطبيب تحاليل أو فحوصات؟",
    "Ready to Meet Your Doctor Online?": "جاهز لمقابلة طبيبك عن بعد؟",
    "Schedule a secure digital consultation in under a minute. Connect with our leading board-certified specialists, review diagnostic reports, and manage your health seamlessly from anywhere.": "احجز استشارة رقمية آمنة خلال أقل من دقيقة، وتواصل مع أطبائنا المعتمدين لإدارة صحتك من أي مكان.",
    "Book Video Appointment": "احجز موعد فيديو",
    "Inquire via WhatsApp": "استفسر عبر واتساب",
    "Next virtual consult available": "أقرب استشارة افتراضية متاحة",
    "Today, 3:30 PM": "اليوم، 3:30 مساءً",
    "Book Video Call →": "احجز مكالمة فيديو ←",
    "Medical Care At Doorstep": "رعاية طبية حتى باب المنزل",
    "Hospital-grade care,": "رعاية بمستوى المستشفى،",
    "at your home.": "في منزلك.",
    "Experience professional, compassionate clinical attention without traveling. From expert doctor home visits and nursing care to physical therapy and rapid laboratory sampling, our fully certified mobile clinical teams bring the hospital directly to you.": "احصل على رعاية طبية احترافية دون تنقل. من زيارات الأطباء والتمريض إلى العلاج الطبيعي وسحب العينات، يصل فريقنا الطبي المعتمد إليك.",
    "Request Home Visit": "اطلب زيارة منزلية",
    "Explore Home Services": "استكشف خدمات المنزل",
    "Mobile Care Capabilities": "خدمات الرعاية المتنقلة",
    "Our Comprehensive": "خدماتنا",
    "Home Services": "المنزلية الشاملة",
    "Physician Home Visits": "زيارات الأطباء المنزلية",
    "Schedule general medicine doctors and specialty consultants to visit your home for clinical consults, physical checkups, prescription renewals, and care guidance.": "احجز زيارة منزلية لطبيب عام أو استشاري لإجراء الاستشارات والفحوصات وتجديد الوصفات وإرشادات الرعاية.",
    "Skilled Nursing Care": "رعاية تمريضية مؤهلة",
    "Licensed nurses providing standard home nursing including wound dressing, vital signs monitoring, injections, intravenous (IV) therapy, and post-operative recovery support.": "ممرضون مرخصون يقدمون خدمات التمريض المنزلي مثل تغيير الضمادات، متابعة العلامات الحيوية، الحقن، العلاج الوريدي، ودعم التعافي بعد العمليات.",
    "Home Physiotherapy": "العلاج الطبيعي المنزلي",
    "Customized home rehabilitation sessions directed by certified physiotherapists. Ideal for orthopedic recovery, neurological rehab, elderly mobility improvement, and pain relief.": "جلسات تأهيل منزلية مخصصة يقدمها أخصائيو علاج طبيعي معتمدون للتعافي العظمي والعصبي وتحسين حركة كبار السن وتخفيف الألم.",
    "Home Laboratory Sampling": "سحب العينات المنزلية",
    "Certified phlebotomists visiting your home to safely collect blood, urine, or other clinical samples. Samples are analyzed at our accredited central labs with digital results uploaded to your portal.": "مختصون معتمدون يزورون منزلك لسحب عينات الدم أو البول بأمان، وتحلل في مختبراتنا المعتمدة مع رفع النتائج رقمياً.",
    "Patient Journey": "رحلة المريض",
    "How To Request": "كيف تطلب",
    "Home Care": "الرعاية المنزلية",
    "Submit Request": "أرسل الطلب",
    "Contact our center by phone, WhatsApp, or the web form to select your desired home service category.": "تواصل معنا عبر الهاتف أو واتساب أو النموذج الإلكتروني لاختيار الخدمة المنزلية المطلوبة.",
    "Clinical Triage": "فرز طبي",
    "Our nurse supervisor reviews your case, confirms details, and matches the correct medical team.": "يراجع مشرف التمريض حالتك ويؤكد التفاصيل ويختار الفريق الطبي المناسب.",
    "At-Home Care": "الرعاية في المنزل",
    "Our fully equipped mobile medical unit arrives at your home at the scheduled hour to deliver care.": "تصل وحدتنا الطبية المتنقلة المجهزة إلى منزلك في الموعد المحدد لتقديم الخدمة.",
    "Home Care Experts": "خبراء الرعاية المنزلية",
    "Mobile Care": "الرعاية المتنقلة",
    "Meet some of our accredited doctors and physical therapists who deliver care at home.": "تعرف على بعض أطبائنا وأخصائيي العلاج الطبيعي المعتمدين الذين يقدمون الرعاية المنزلية.",
    "Frequently Asked": "أسئلة شائعة",
    "Home Care Questions": "حول الرعاية المنزلية",
    "What geographic areas do your home care teams cover?": "ما المناطق التي تغطيها فرق الرعاية المنزلية؟",
    "Our mobile units operate out of our Jeddah and Riyadh branches, providing complete coverage across the municipal city limits of both Jeddah and Riyadh. We can coordinate care for nearby outlying suburbs upon special review.": "تعمل وحداتنا المتنقلة من فروع جدة والرياض وتغطي داخل حدود المدينتين، ويمكن تنسيق الخدمة للمناطق القريبة بعد مراجعة خاصة.",
    "Are home healthcare services covered by insurance?": "هل تغطي شركات التأمين خدمات الرعاية المنزلية؟",
    "Insurance coverage varies. Certain home nursing, physician, and physiotherapy care plans are covered under premium networks or post-surgical recovery policies. Our billing coordinators will verify pre-authorization requirements with your provider.": "تختلف التغطية حسب الوثيقة. بعض خدمات التمريض والأطباء والعلاج الطبيعي تغطى ضمن شبكات محددة أو خطط ما بعد الجراحة، وسيتحقق فريق الفوترة من الموافقات.",
    "Can home care treat urgent or emergency medical events?": "هل تعالج الرعاية المنزلية الحالات الطارئة؟",
    "No. Our home healthcare services are structured solely for scheduled, non-emergency clinical visits, chronic disease follow-ups, and rehabilitation plans. For acute emergencies, call Red Crescent (997) or visit the nearest emergency department.": "لا. خدمات الرعاية المنزلية مخصصة للزيارات المجدولة وغير الطارئة ومتابعة الأمراض المزمنة والتأهيل. للحالات الطارئة اتصل بالهلال الأحمر 997 أو توجه لأقرب طوارئ.",
    "Are your visiting home care staff fully accredited?": "هل فريق الرعاية المنزلية معتمد بالكامل؟",
    "Yes, all visiting physicians, registered nurses, and physical therapists are licensed by the Saudi Commission for Health Specialties (SCFHS), fully certified by My Clinic, and follow international standards verified by CBAHI guidelines.": "نعم، جميع الأطباء والممرضين وأخصائيي العلاج الطبيعي مرخصون من الهيئة السعودية للتخصصات الصحية ومعتمدون من ماي كلينك ويتبعون معايير سباهي.",
    "Ready to Arrange Clinical Care at Home?": "جاهز لترتيب رعاية طبية في المنزل؟",
    "Schedule a professional medical team or certified physiotherapist to visit you. Coordinate nursing plans, arrange post-surgery dressings, or order comfortable home lab tests today.": "احجز زيارة فريق طبي أو أخصائي علاج طبيعي معتمد، ونسق خطط التمريض أو غيارات ما بعد الجراحة أو فحوصات المختبر المنزلية.",
    "Schedule Home Visit": "احجز زيارة منزلية",
    "Need home testing? Phlebotomists available": "تحتاج فحوصات منزلية؟ مختصو سحب العينات متاحون",
    "Tomorrow Morning": "غداً صباحاً",
    "Book Lab Visit →": "احجز زيارة مختبرية ←",
    "Allergy & Immunology": "الحساسية والمناعة",
    "Audio-vestibular & Speech": "السمع والتوازن والتخاطب",
    "Dental": "الأسنان",
    "Dermatology & Cosmetics": "الجلدية والتجميل",
    "Emergency": "الطوارئ",
    "General & Bariatric Surgery": "الجراحة العامة وجراحة السمنة",
    "Geriatric Medicine": "طب كبار السن",
    "Hematology": "أمراض الدم",
    "Nephrology": "الكلى",
    "Nutrition": "التغذية",
    "Occupational Medicine": "طب العمل",
    "Psychiatry & Psychology": "الطب النفسي وعلم النفس",
    "Rheumatology": "الروماتيزم",
  };

  const originals = new WeakMap();

  function normalize(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  }

  function setPills(lang) {
    document.querySelectorAll(".lang-pill button").forEach((button) => {
      const active = button.textContent.trim().toLowerCase() === lang;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function translateTextNodes(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node);
      const key = normalize(original);
      if (lang === "ar" && dictionary[key]) {
        node.nodeValue = original.replace(key, dictionary[key]);
      } else if (lang === "en") {
        node.nodeValue = original;
      }
    });
  }

  function translateAttributes(lang) {
    document.querySelectorAll("[placeholder]").forEach((el) => {
      if (!el.dataset.i18nPlaceholderOriginal) {
        el.dataset.i18nPlaceholderOriginal = el.getAttribute("placeholder") || "";
      }
      const original = el.dataset.i18nPlaceholderOriginal;
      el.setAttribute("placeholder", lang === "ar" && dictionary[original] ? dictionary[original] : original);
    });
    document.querySelectorAll("[data-eyebrow], [data-title], [data-sub], [data-quote], [data-primary-label], [data-secondary-label]").forEach((el) => {
      ["eyebrow", "title", "sub", "quote", "primaryLabel", "secondaryLabel"].forEach((name) => {
        const attr = `data-${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
        if (!el.hasAttribute(attr)) return;
        const originalAttr = `data-i18n-original-${attr.slice(5)}`;
        if (!el.hasAttribute(originalAttr)) el.setAttribute(originalAttr, el.getAttribute(attr) || "");
        const original = el.getAttribute(originalAttr);
        el.setAttribute(attr, lang === "ar" && dictionary[original] ? dictionary[original] : original);
      });
    });
  }

  function flipTextArrows(lang) {
    document.querySelectorAll(".more, .split-card .cta, .sticky-cta a, .sticky-cta button, .doctor-ad-btn, .find-doc-btn").forEach((el) => {
      if (!el.dataset.i18nArrowOriginal) {
        el.dataset.i18nArrowOriginal = el.textContent;
      }
      const original = el.dataset.i18nArrowOriginal;
      el.textContent = lang === "ar" ? original.replace(/→/g, "←") : original;
    });
  }

  let translating = false;
  function applyLanguage(lang) {
    translating = true;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");
    setPills(lang);
    translateTextNodes(lang);
    translateAttributes(lang);
    flipTextArrows(lang);
    translating = false;
    document.dispatchEvent(new CustomEvent("myclinic:language-change", { detail: { lang } }));
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".lang-pill button");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    applyLanguage(button.textContent.trim().toLowerCase() === "ar" ? "ar" : "en");
  }, true);

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang());
    let timer = 0;
    const observer = new MutationObserver(() => {
      if (translating || currentLang() !== "ar") return;
      clearTimeout(timer);
      timer = setTimeout(() => applyLanguage("ar"), 30);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });

  window.MyClinicLanguage = { apply: applyLanguage, current: currentLang };
})();

const SIDEBAR = {
    LABEL: {
        City: "المدن",
        Delivery: "التسليم",
        PAYMENT_PLAN: "خطة السداد",
        DOWN_PAYMENT: "الدفعة الاولى",
        DELIVERY: "التسليم",
        YEARS: "سنوات التقسيط",
        UNIT_TOTL_PRICE: "الميزانية",
        BEDROOMS: "عدد الغرف",
        BUILT_UP_AREA: "المساحة المبنية",
        COMPOUND: "المجمع العقاري",
        PROJECT: "المشروع",
        DEVELOPER: "المطور العقاري",
        FINISHING: "التشطيب",
        TYPES: "النوع"
    },
    INFO: {
        BEDROOMS: "لقد قمت بتحديد عدد غرف"
    },
    RESULT_LABEL: {
        UNIT_TOTL_PRICE: "السعر |",
        YEARS: "السنوات |",
        DWON_PAYMENT: "المقدم |"
    },
    OPTIONS: {
        UNIT_TOTL_PRICE_TYPES: [
            {
                Label: "تقسيط",
                Value: "Installment"
            },
            {
                Label: "كاش",
                Value: "CashDiscount"
            }
        ]
    }
};
export const Lang = {
    APP_NAME: "Master - V",
    NO_OPTIONS: "لا يوجد خيارات متوفرة",
    NO_DATA: "لا يوجد بيانات",
    LOADING: "جاري التحميل...",
    PREV: "السابق",
    NEXT: "التالي",
    SUBMIT: "إرسال",
    DOWNLOAD: "تحميل",
    FULL_SCREEN: "شاشة كاملة",
    CHOOSE: "اختر",
    SERVER: "اتصالك بالخدمة",
    ONLINE: "متصل",
    OFFLINE: "غير متصل",
    NO_INTERNET: "لا يوجد اتصال بالانترنت",
    VERSION_VIEW: "نظام العرض : {{Version}}",
    SAVE: "حفظ",
    RESET: "اعادة تعيين",
    VIEW: "عرض",
    UPDATE: "تحديث",
    CREATE: "اضافة",
    SEARCH: "بحث",
    CLEAR: "اعادة تعيين",
    MORE: "المزيد...",
    CLOSE: "اغلاق",
    FROM: "من",
    TO: "الي",
    OK: "تم",
    SELECT_ALL: "اختر الكل",
    UNSELECT_ALL: "الغاء تحديد الكل",
    SELECTED: "تم تحديد : {{Count}}",
    RESET_SECTION: "استعادة {{Section}}",

    SIDEBAR: SIDEBAR,
    PUBLIC: {
        UPDATED: "اخر تحديث",
        TODAY: "اليوم",
        YESTERDAY: "أمس",
        EXPIRED_MESSAGE: "متبقي {{days}} يوم لانتهاء صلاحية حسابك",
        TODAY_EXPIRED_MESSAGE: "سيتم انتهاء صلاحية حسابك اليوم عند منتصف الليل",
        UPLOAD_FILES: "تحميل الملفات",
        WORDS: {
            METR: "م",
            DELIVERY: "سنة",
            YEARS: "سنة",
            DELIVERY_TITLE: "R T M",
            START_BUA: "اقل مساحة",
            START_PRICE: "اقل سعر"
        },
        FINISHING: {
            0: "غير مكتمل",
            1: "مكتمل بالكامل"
        },
        DELETE_LABEL: "حذف {{Name}}",
        DELETE_MESSAGE: "هل انت متاكد من حذف {{Name}} ؟ \n لا يمكن التراجع عن هذا الاجراء بعد الان",
        Personal: "شخصي",
        Company: "شركة",
        IP_CHECK_1: "جاري الكشف عن الاي بي الخاص بك الرجاء الانتظار ...",
        IP_CHECK_2: "جاري التحقق من الاي بي الخاص بك الرجاء الانتظار ...",
        COPY_TO_CLIPBOARD: "تم النسخ الي الحافظة",
        NEW_NOTIFICATION: "لديك {{Count}} اشعار جديد"
    },
    VERSIONS: [
        {
            Label: "النسخة السابقة",
            Value: 1
        },
        {
            Label: "النسخة الأحدث",
            Value: 2
        }
    ],
    NAVBAR: {
        ROUTES: {
            Data: "البيانات",
            Settings: "الاعدادات",
            Dashboard: "لوحة التحكم",
            Comparison: "المقارنة",
            Sales: "المبيعات"
        }
    },
    WHASTAPP_SENDER: {
        STATUS: "اتصالك بالواتساب",
        TIME_LEFT: "الوقت المتبقي للارسال : ",
        SEND_TO_LABEL: "ارسال الى واتساب : ",
        WAITING: "يرجي الانتظار حتي ينتهي وقت الانتظار",
        // WAITING : "Please Wait While Countdown End",
        MESSAGES: {
            OnQRUpdated: "يرجي القيام بمسح الباركود من خلال الواتساب للقيام بالربط",
            OnQRUpdated_NULL: "لقد تخطيت عدد تكرار اعادة انشاء الكود يرجي المحاولة لاحقا",
            OnConnecting: "يرجي الانتظار ريثما نقوم بالاتصال بالواتساب",
            OnConnected: "تم الاتصال بالواتساب بنجاح",
            OnDisConnected: "تم الغاء الاتصال بالواتساب"
        },
        DESCRIPTION_FAILD_TO_SEND: "فشل في ارسال وصف المشروع",
        FILE_FAILD_TO_SEND: "فشل في ارسال ملف {{File}}",
        SUCCESS_SENT_FILES: "تم ارسال {{Count}} ملف بنجاح"
    },
    AUTH_PAGE: {
        ContactSupport: "تواصل مع الدعم",
        LABEL: {
            Register: "انشاء حساب جديد",
            Login: "تسجيل الدخول",
            Forget: "نسيت كلمة المرور",
            City: "City",
            Section: "القسم "
        },
        BUTTONS: {
            Login: "تسجيل الدخول",
            Register: "انشاء الحساب",
            Forget: "نسيت كلمة المرور"
        },
        ASK: {
            HAVE_ACCOUNT: "لديك حساب؟",
            DONT_HAVE_ACCOUNT: "ليس لديك حساب؟",
            BACKTO: "العودة الى ?"
        },
        MESSAGES: {
            VERIFY_LOADING: "جاري التحقق من البيانات",
            VERIFY_LOADING2: "يرجي الانتظار حتى نتمكن من التحقق من بياناتك",
            VERIFY_FAIL:
                "فشل تغيير كلمة المرور الخاصة بك يرجى المحاولة مرة اخرى \n او اذا كان لديك مشكلة يرجى الاتصال بنا",

            REASON: "السبب : "
        },
        INPUTS: {
            PASSWORD: "الرقم السري",
            CONFIRM_PASSWORD: "تأكيد الرقم السري",
            PHONE_NUMBER: "رقم الواتساب",
            EMAIL: "البريد الالكتروني",
            USER_NAME: "اسم المستخدم",
            ROLE: "نوع الحساب",
            COMPANY_NAME: "اسم الشركة",
            USERS_COUNT: "عدد المستخدمين",
            PLAN: "اختر الخطة",
            SECTION: "اختر الاقسام",
            CITY: "اختر مدن ال{{Key}}",
            OLD_PASSWORD: "الرقم السري القديم",
            NEW_PASSWORD: "الرقم السري الجديد",
            CONFIRM_NEW_PASSWORD: "تأكيد الرقم السري الجديد",
            JOB_TITLE: "الوظيفة"
        },
        OPTIONS: {
            PLAN: [
                {
                    Name: "اختر",
                    Value: ""
                },
                {
                    Name: "تجريبي",
                    Value: "Trial"
                },
                {
                    Name: "شهر واحد",
                    Value: 1
                },
                {
                    Name: "3 اشهر",
                    Value: 3
                },
                {
                    Name: "6 اشهر",
                    Value: 6
                },
                {
                    Name: "سنة واحدة",
                    Value: 12
                }
            ],
            ROLES: [
                {
                    Name: "شركة",
                    Key: "Company",
                    Value: 4
                },
                {
                    Name: "شخصي",
                    Key: "Personal",
                    Value: 5
                },
                {
                    Name: "ذهبي",
                    Key: "Gold",
                    Value: 7
                }
            ]
        }
    },
    SALES_PAGE: {
        EARNED: "أرباحك المحصلة : {{Count}} جنيه",
        MESSAGE: "بالاضافة لأي حوافز من المطور",
        BUTTONS: {
            COMMISSION_REQUEST: "طلب اصدار عمولة لبيعة جديدة",
            COMMISSION_CALCULATE: "احسب عمولتك",
            ACCEPT_DATA: "تأكيد البيانات"
        },
        LABELS: {
            ADD: "طلب اصدار عمولة",
            EDIT: "تعديل طلب اصدار عمولة",
            Claculator: "حاسبة العمولة",
            COMMISSION_DUE_INFO: "بيانات العمولات المستحقة",
            COMMISSION_COLLECTED: "عمولات تم تحصيلها",
            UPLOADER: "قم بتحميل صور من العقد",
            SalesDeveloper: "المطور العقاري",
            SalesProject: "المشروع",
            SalesCustomer: "اسم العميل",
            SalesExecutive: "اسم مسئول المبيعات",
            SalesDate: "تاريخ البيع",
            SalesUnitPrice: "سعر الوحدة",
            SalesUnitType: "نوع الوحدة",
            TransactionValue: "قيمة الصفقة",
            CommissionRate: "نسبة العمولة",
            TotalCommission: "العمولة الاجمالية",
            TotalTax: "اجمالي الضريبة",
            CheckValue: "قيمة الشيك",
            NetCommission: "صافي العمولة",
            YourProfits: "أرباحك"
        },
        STATUS: {
            Progress: "قيد المراجعة",
            Received: "تم تأكيد البيانات",
            Verified: "تم تقديم المطالبة",
            Completed: "تم التحصيل"
        }
    },
    DATA_PAGE: {
        PROJECT_COUNT: "عدد المشاريع",
        PHASES: "المراحل",
        ACCOUNT: "الحساب :",
        ADVANCED: "متقدم",
        UN_READED: "غير مقروء",
        READ: "مقروء",
        LE: "جنيه",
        KEY_ACCOUNT: "الحساب الرئيسي",
        LOAD_MORE: "تحميل المزيد ...",
        DISCOUNT: "خصم",
        LABELS: {
            DELIVERY: "التسليم",
            CLUB_FEES: "رسوم النادي",
            CASH_DISCOUNT: "خصم الكاش",
            MAINTANCE: "رسوم الصيانة",
            PARKING_FEES: "رسوم الجراج",
            DOWN_PAYMENT: "الدفعة الاولى",
            BEDROOMS: "غرفة",
            ProjectName: "اسم المشروع",
            OriginalPrice: "السعر الاصلي",
            OfferDiscount: "خصم العرض",
            FinalPrice: "السعر النهائي",
            Type: "النوع",
            Area: "المساحة",
            TotalUnitPrice: "Total Unit Price",
            CapRate: "CAP Rate",
            OperatingTime: "Operating Time",
            PriceApprecitionTD: "Price Apprecition % Till Delivery",
            PriceApprecitionAD: "Price Apprecition % After Delivery",
            DiscountRate: "Discount Rate",
            UnitPriceDelivery: "Unit Price @ Delivery",
            UnitPriceAfterInstalmentYears: "Unit Price After Instalment Years ( Apprecition )",
            AmountPaidDelivery: "Amount Paid @ Delivery",
            AmountPaidAfterDelivery: "Amount Paid After Delivery",
            TotalRentAfterDelivery: "Total Rent After Delivery",
            NetRentInstalmentAfterDelivery: "Net Rent - Instalment After Delivery",
            TotalRevenue: "Total Revenue",
            NetProfit: "Net Profit",
            TotalEquityPaid: "Total Equity Paid",
            UnitPVatPurchasing: "Unit PV at Purchasing",
            UnitPVafterInstalment: "Unit PV after Instalment",
            EquityPVatPurchasing: "Equity PV at Purchasing",
            ROI: "ROI",
            ROE: "ROE",
            IRR: "IRR",
            Leverage: "Leverage",
            PaybackPeriodFromRentafterDelivery: "Payback Period From Rent after Delivery",
            ROINPV: "ROI - NPV",
            ROENPV: "ROE - NPV"
        },
        STATUS_DATA: {
            1: "متاح",
            2: "قريبا",
            3: "متاح", // Custom
            4: "قريبا", // custom
            5: "غير متاح"
        },
        STATUS_MESSAGES: {
            3: "تفاصيل الوحدات المتاحه متغيره وغير واضحة من الشركة المطورة - يرجى التواصل المباشر مع المطور",
            4: "المشروع في المرحلة الافتتاحية الان \n للتفاصيل المتاحة يرجى التواصل مع الشركة المطورة.",
            5: "غير متاح الان"
        },
        STATUS_REPLACE: {
            3: "بالطلب",
            4: "قريبا",
            5: "غير متاح"
        },
        PAY_PALN_TYPES: {
            1: "Equal",
            2: "Front Loaded",
            3: "Back Loaded"
        },
        VIEWS: {
            MATRIAL: {
                Brochure: "الكتيب",
                Contract: "العقد",
                MasterPlan: "الخطة الرئيسية",
                Photos: "الصور",
                Description: "الوصف"
            }
        },
        TABS: {
            OLD_VERSION: [
                {
                    Label: "التفاصيل",
                    Value: "Details"
                },
                {
                    Label: "أساسي",
                    Value: "Basic"
                }
            ],
            SECTIONS: [
                {
                    ViewLabel: "سكني",
                    label: "Residential",
                    value: 1,
                    id: 1
                },
                {
                    ViewLabel: "تجاري",
                    label: "Commercial",
                    value: 2,
                    id: 2
                }
            ]
        },
        ACTIONS: {
            PAYMENT_PLAN: "خطط الدفع",
            CONTACTS: "جهات الاتصال",
            OFFERS: "العروض والأخبار",
            CITYSCAPE: "سيتي سكيب",
            NOTES: "الملاحظات",
            DESCRIPTION: "الوصف",
            LAYOUTS: "التصميمات",
            MATRILAS: "المواد",
            PRICELIST: "قائمة الأسعار",
            URL: "الفيديوهات",
            Location: "الموقع",
            PAY_PLAN_NOTE_HEAD: "ملاحظات :",
            PAY_PLAN_NOTE: "يرجى العلم أن الأسعار الحالية بعد الخصم"
        },
        MESSAGES: {
            NO_MESSAGE: "لا توجد رسائل لهذا المجمع",
            NO_URL: "لا يوجد رابط لهذا المجمع",
            CITYSCAPE: "لمعرفة عروض نظام الدفع، يرجى فتح تقرير الأسعار"
        },
        OPTIONS: {
            ORDER: [
                {
                    Label: "السعر",
                    Value: "DataMinUnitPrice"
                },
                {
                    Label: "الغرف",
                    Value: "DataBedRooms"
                },
                {
                    Label: "التسليم",
                    Value: "DataDeliveryFrom"
                },
                {
                    Label: "آخر تحديث",
                    Value: "DataDate"
                }
            ],
            ADDITIONAL: [
                {
                    Label: "مميزات اضافية",
                    Value: "ExtraBenefits"
                },
                {
                    Label: "استشاري هندسي",
                    Value: "Engineering"
                },
                {
                    Label: "استشاري معماري",
                    Value: "Architecture"
                },
                {
                    Label: "استشاري تنفيذي",
                    Value: "Executive"
                },
                {
                    Label: "شركة الإدارة",
                    Value: "Management"
                }
            ]
        },
        EXTRA_BENFITS: {
            1: "عائد عالمقدم",
            2: "عائد علي الأقساط",
            3: "إيجار الإلزامي",
            4: "تفويض بالإيجار"
        },
        PAY_MODAL: {
            BULK_1: "Bulk 1",
            BULK_2: "Bulk 2",
            1: "1st Installment",
            2: "2nd Installment",
            3: "3rd Installment",
            4: "{{INDEX}}th Installment"
        }
    },
    SETTINGS_PAGE: {
        USER_NAME: "اسم الواتساب",
        NUMBER: "رقم الواتساب",
        DELETE_SESSION: "حذف الاتصال",
        TABS: [
            {
                Label: "الحساب",
                Value: 1
            },
            {
                Label: "اتصال الواتساب",
                Value: 2
            }
        ]
    },
    DASHBOARD_PAGE: {
        USERS: "المستخدمين",
        TABS: [
            {
                Label: "المستخدمين",
                Value: 1
            },
            {
                Label: "الشركات V1",
                Value: 2
            }
        ],
        OPTIONS: {
            FILTER: [
                {
                    Name: "اسم المستخدم",
                    Value: "UserName"
                },
                {
                    Name: "الوظيفة",
                    Value: "UserJobTitle"
                },
                {
                    Name: "رقم الواتساب",
                    Value: "UserPhoneNumber"
                },
                {
                    Name: "البريد الالكتروني",
                    Value: "UserEmail"
                }
            ],
            JOB_TITLE: [
                { Name: "اختر", Value: "" },
                { Name: "مندوب مبيعات مبتدئ", Value: "Junior Sales" },
                { Name: "مندوب مبيعات أول", Value: "Senior Sales" },
                { Name: "قائد فريق", Value: "Team Leader" },
                { Name: "مشرف مبيعات", Value: "Sales Supervisor" },
                { Name: "مدير مبيعات", Value: "Sales Manager" },
                { Name: "مدير مبيعات عام", Value: "Sales Director" },
                { Name: "رئيس قسم المبيعات", Value: "Head Of Sales" },
                { Name: "الرئيس التنفيذي", Value: "CEO" }
            ]
        }
    },
    TABLES: {
        DataDate: "آخر تحديث",
        DataDeveloper: "المطور",
        DataCompound: "المجمع",
        DataCompoundId: "المشروع",
        DataStatus: "الحالة",
        DataArea: "الموقع",
        DataAcres_ProjectArea: "عدد الافدنة",
        DataPolicy: "سياسة الشركة",
        DataSubType: "النوع",
        DataBedRooms: "عدد الغرف",
        DataBuiltUpAreaFrom: "مساحة البناء",
        DataUnitTotalPriceFrom: "السعر الأصلي (من - إلى)",
        DataUnitTotalPriceDiscountFrom: "السعر النقدي (من - إلى)",
        Name: "الاسم",
        Number: "رقم الاتصال",
        Tools: "الادوات",
        Username: "الاسم",
        Title: "المسمي الوظيفي",
        WhatsApp: "رقم الواتساب",
        EmailAdress: "البريد الالكتروني",
        TotalCommission: "اجمالي العمولة المستحقة",
        SalesUnitPrice: "سعر الوحدة",
        SalesUnitType: "نوع الوحدة",
        SalesProject: "المشروع",
        SalesDeveloper: "المطور",
        SalesCreatedAt: "تاريخ طلب الاصدار",
        Type: "النوع",
        Bua: "مساحة البناء",
        InstallmentPrice: "سعر القسط",
        CachPrice: "سعر الكاش",
        DownPayment: "الدفعة المقدمة",
        Monthly: "شهري",
        Outdoor: "خارجي",
        // ---- New ----
        Installment: "التقسيط",
        Ammount: "المبلغ",
        DueDate: "تاريخ الاستحقاق",
        Total: "الاجمالي"
    },
    VALIDATION: {
        EMAIL_REQUIRED: "البريد الالكتروني مطلوب",
        EMAIL_INVALID: "البريد الالكتروني غير صحيح",
        PHONE_NUMBER_REQUIRED: "رقم الواتساب مطلوب",
        PHONE_NUMBER_INVALID: "رقم الواتساب غير صحيح",
        USERNAME_REQUIRED: "اسم المستخدم مطلوب",
        USERNAME_LENGTH: "اسم المستخدم يجب ان يكون اكثر من حرف",
        USERNAME_INVALID: "اسم المستخدم يجب ان يحتوي علي حرف واحد عالاقل",
        PASSWORD_REQUIRED: "كلمة المرور مطلوبة",
        PASSWORD_LENGTH: "كلمة المرور يجب ان تكون اكثر من او تساوي 6 حروف",
        PASSWORD_INVALID: "كلمة المرور يجب ان تحتوي علي حروف وارقام",
        PASSWORD_DIDNOT_MATCH: "كلمة المرور غير متطابقة",
        OLD_PASSWORD_REQUIRED: "كلمة المرور القديمة مطلوبة",
        NEW_PASSWORD_REQUIRED: "كلمة المرور الجديدة مطلوبة",
        CONFIRM_NEW_PASSWORD_REQUIRED: "تاكيد كلمة المرور الجديدة مطلوبة",
        PASSWORDS_NOT_MATCH: "كلمة المرور و تاكيد كلمة المرور غير متطابقين",
        ACCOUNT_TYPE_REQUIRED: "نوع الحساب مطلوب",
        COMPANY_NAME_REQUIRED: "اسم الشركة مطلوب",
        COMPANY_NAME_LENGTH: "اسم الشركة يجب ان يكون اكثر من حرفين",
        COMPANY_NAME_INVALID: "اسم الشركة يجب ان يحتوي علي حرف واحد عالاقل",
        USERS_COUNT_REQUIRED: "عدد المستخدمين مطلوب",
        SECTIONS_LENGTH: "لا يمكن ان يكون عدد الأقسام اقل من 1",
        SECTION_IS_EMPTY: "مدن ال{{Key}} لا يمكن ان تكون اقل من 1 بينما تم اختيار القسم {{Key}}",
        PLAN_REQUIRED: "الخطة مطلوبة",
        JOB_TITLE_REQUIRED: "المسمي الوظيفي مطلوب",
        FILES_REQUIRED: "يرجي اختيار ملف واحد عالاقل",
        MESSAGE_REQUIRED: "لا يمكن ارسال رسالة فارغة",
        FILE_REQUIRED: "لا يمكن ارسال ملف فارغ",
        PHONE_NUMBER_STARTS_WITH: "الرقم يبدء بكود البلد",
        SALES_DEVELOPER_REQUIRED: "يرجي اختيار المطور",
        SALES_PROJECT_REQUIRED: "يرجي اختيار المشروع",
        SALES_DATE_REQUIRED: "يرجي ادخال تاريخ البيع",
        SALES_UNIT_PRICE_REQUIRED: "يرجي ادخال سعر الوحدة",
        SALES_UNIT_TYPE_REQUIRED: "يرجي ادخال نوع الوحدة",
        SALES_CUSTOMER_REQUIRED: "يرجي ادخال اسم العميل",
        SALES_EXECUTIVE_REQUIRED: "يرجي ادخال اسم مسئول المبيعات"
    },
    ERRORS: {
        NO_COORDINATES: "لا توجد إحداثيات لـ {{Compound}}",
        NO_URL: "لا توجد توجيهات لـ {{Compound}}",
        NO_DESCRIPTION: "لا يوجد وصف لـ {{Compound}}",
        NO_CONTACTS: "لا توجد جهات اتصال حتى الآن لـ {{Developer}}",
        CDN_UNAVILABLE: "عرض الملف غير متاح، يرجى الاتصال بالمسؤول باستخدام الكود: 199404",
        SERVIES_UNAVILABLE: "الخدمات غير متاحة \n يرجى الاتصال بالمسؤول \n باستخدام الكود: 199405",
        FILE_VIEW_NOT_ALLOWED:
            "لا يمكن عرض هذا الملف \n نحن لا ندعم عرض هذا النوع من الملفات حاليًا \n يرجى تنزيله",
        NOT_ALLOWED_SECTION: "تحتاج إلى اختيار قسم {{Key}} أولا",
        NO_NOTIFICATIONS: "لا يوجد أشعارات حاليا",
        PHONE_NUMBER_STARTS_WITH: "الرقم يبدء بكود البلد",
        NO_CONNECTION: "لم يتم العثور على اتصال لـ {key}، يرجى التأكد من أنك متصل",
        NO_CITIES_FOUND: "لا توجد مدن متاحة لهذا القسم، يرجى التواصل مع الادمن",
        NO_SUBSCRIPTION_FOUND: "انت لم تقم بالاشتراك في ( {{KEY}} ) بعد، يرجى الاشتراك اولا",
        RESET_SECTION_EMPTY: "لا توجد بيانات لإعادة تعيينها"
    }
};

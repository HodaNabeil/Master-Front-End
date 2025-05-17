const SIDEBAR = {
    LABEL: {
        City: "Cities",
        Delivery: "Delivery",
        PAYMENT_PLAN: "Payment Plan",
        DOWN_PAYMENT: "Down Payment",
        DELIVERY: "Delivery",
        YEARS: "Installment Years",
        UNIT_TOTL_PRICE: "Budget",
        BEDROOMS: "Bedrooms",
        BUILT_UP_AREA: "Built Up Area",
        COMPOUND: "Compound",
        PROJECT: "Project",
        DEVELOPER: "Developer",
        FINISHING: "Finishing",
        TYPES: "Types"
    },
    INFO: {
        BEDROOMS: "You Have Selected Bedrooms"
    },
    RESULT_LABEL: {
        UNIT_TOTL_PRICE: "Price |",
        YEARS: "Years |",
        DWON_PAYMENT: "Down |"
    },
    OPTIONS: {
        UNIT_TOTL_PRICE_TYPES: [
            {
                Label: "Installment",
                Value: "Installment"
            },
            {
                Label: "Cash",
                Value: "CashDiscount"
            }
        ]
    }
};
export const Lang = {
    APP_NAME: "Master - V",
    NO_OPTIONS: "No Options Founded",
    NO_DATA: "No Data Founded",
    LOADING: "Loading...",
    PREV: "Previous",
    NEXT: "Next",
    SUBMIT: "Submit",
    DOWNLOAD: "Download",
    FULL_SCREEN: "Full Screen",
    CHOOSE: "Choose",
    SERVER: "Service Connection",
    ONLINE: "Online",
    OFFLINE: "Offline",
    NO_INTERNET: "No Internet Connection",
    VERSION_VIEW: "Display system : {{Version}}",
    UPDATE: "Update",
    DELETE: "Delete",
    CREATE: "Create",
    SEARCH: "Search",
    CLEAR: "Clear",
    MORE: "More...",
    SAVE: "Save",
    RESET: "Reset",
    VIEW: "View",
    CLOSE: "Close",
    FROM: "From",
    OK: "Ok",
    TO: "To",
    SELECT_ALL: "Select All",
    UNSELECT_ALL: "UnSelect All",
    RESET_SECTION: "Reset {{Section}}",
    SELECTED: "Selected : {{Count}}",
    SIDEBAR: SIDEBAR,
    // PUBLIC?.FINISHING
    PUBLIC: {
        UPDATED: "Updated",
        TODAY: "Today",
        YESTERDAY: "Yesterday",
        EXPIRED_MESSAGE: "{{days}} Days Left To Expire Your Account",
        TODAY_EXPIRED_MESSAGE: "Your Account Will Expire Today At Mid Night",
        UPLOAD_FILES: "Upload Files",
        WORDS: {
            METR: "m",
            DELIVERY: "Years",
            YEARS: "Years",
            DELIVERY_TITLE: "R T M",
            START_BUA: "Start Bua",
            START_PRICE: "Start Price"
        },
        FINISHING: {
            0: "Not Finishing",
            1: "Fully Finished"
        },
        DELETE_LABEL: "Delete {{Name}}",
        DELETE_MESSAGE:
            "Are You Sure To Delete {{Name}} ? \n You Can't Undo This Action Afterwards.",
        Personal: "Personal",
        Company: "Company",
        IP_CHECK_1: "Your IP is Being Detected Please Wait...",
        IP_CHECK_2: "Your IP is Being Verified Please Wait...",
        COPY_TO_CLIPBOARD: "Copied To Clipboard",
        NEW_NOTIFICATION: "You Have {{Count}} New Notification"
    },
    VERSIONS: [
        {
            Label: "Last Version",
            Value: 1
        },
        {
            Label: "New Version",
            Value: 2
        }
    ],
    NAVBAR: {
        ROUTES: {
            Data: "Data",
            Settings: "Settings",
            Dashboard: "Dashboard",
            Comparison: "Comparison",
            Sales: "Sales"
        }
    },
    WHASTAPP_SENDER: {
        STATUS: "Whatsapp Connection",
        TIME_LEFT: "Time Untile Next Send : ",
        SEND_TO_LABEL: "Send To Whatsapp :",
        WAITING: "Please Wait While Countdown End",
        MESSAGES: {
            OnQRUpdated: "Please Scan The QR Code From Whatsapp To Link",
            OnQRUpdated_NULL: "Maximum Number Of Tries Exceededو Please Try Again Later",
            OnConnecting: "Please Wait While We Connecting To Whatsapp",
            OnConnected: "Connected To Whatsapp Successfully",
            OnDisConnected: "Disconnected From Whatsapp"
        },
        DESCRIPTION_FAILD_TO_SEND: "Failed To Send Description",
        FILE_FAILD_TO_SEND: "Failed To Send {{File}} File",
        SUCCESS_SENT_FILES: "Successfully Sent {{Count}} Files"
    },
    AUTH_PAGE: {
        ContactSupport: "Contact Support ",
        LABEL: {
            Register: "Create New Account",
            Login: "Login",
            Forget: "Forget Password",
            City: "City",
            Section: "Section"
        },
        BUTTONS: {
            Login: "Login",
            Register: "Sign Up",
            Forget: "Forget Password"
        },
        ASK: {
            HAVE_ACCOUNT: "have Account ?",
            DONT_HAVE_ACCOUNT: "Don't have an account?",
            BACKTO: "Back To ?"
        },
        MESSAGES: {
            VERIFY_LOADING: "Validating Your Data",
            VERIFY_LOADING2: "Plaese Wait While We Verify Your Data",
            VERIFY_FAIL:
                "Failed To Reset Your Password Please Try Again \n Or If You Have A Problem Please Contact Us ",
            REASON: "Reason : "
        },
        INPUTS: {
            PASSWORD: "Password",
            CONFIRM_PASSWORD: "Retype Password",
            PHONE_NUMBER: "Whatsapp",
            EMAIL: "Email Address",
            USER_NAME: "User Name",
            ROLE: "Account Type",
            COMPANY_NAME: "Company Name",
            USERS_COUNT: "Users Count",
            PLAN: "Select Plan",
            SECTION: "Choose Section",
            CITY: "Choose {{Key}} Cities",
            OLD_PASSWORD: "Old Password",
            NEW_PASSWORD: "New Password",
            CONFIRM_NEW_PASSWORD: "Confirm New Password",
            JOB_TITLE: "Title"
        },
        OPTIONS: {
            PLAN: [
                {
                    Name: "Choose",
                    Value: ""
                },
                {
                    Name: "Trial",
                    Value: "Trial"
                },
                {
                    Name: "1 Month",
                    Value: 1
                },
                {
                    Name: "3 Months",
                    Value: 3
                },
                {
                    Name: "6 Months",
                    Value: 6
                },
                {
                    Name: "1 Year",
                    Value: 12
                }
            ],
            ROLES: [
                {
                    Name: "Company",
                    Key: "Company",
                    Value: 4
                },
                {
                    Name: "Personal",
                    Key: "Personal",
                    Value: 5
                },
                {
                    Name: "Gold",
                    Key: "Gold",
                    Value: 7
                }
            ]
        }
    },
    SALES_PAGE: {
        EARNED: "Your Earned Profits: {{Count}} LE",
        MESSAGE: "In Addition To Any Incentives From Developer",
        BUTTONS: {
            COMMISSION_REQUEST: "Request Commission For New Sale",
            COMMISSION_CALCULATE: "Calculate Commission",
            ACCEPT_DATA: "Confirm Data"
        },
        LABELS: {
            ADD: "Commission Request",
            EDIT: "Edit Commission Request",
            Claculator: "Commission Calculator",
            COMMISSION_DUE_INFO: "Commissions Due Information",
            COMMISSION_COLLECTED: "Commissions collected",
            UPLOADER: "Upload Images Of The Contract",
            SalesDeveloper: "Developer",
            SalesProject: "Project",
            SalesCustomer: "Customer",
            SalesExecutive: "Sales Executive Name",
            SalesDate: "Date of sale",
            SalesUnitPrice: "Unit Price",
            SalesUnitType: "Unit Type",
            TransactionValue: "Transaction Value",
            CommissionRate: "Commission Rate",
            TotalCommission: "Total Commission",
            TotalTax: "Total Tax",
            CheckValue: "Check Value",
            NetCommission: "Net Commission",
            YourProfits: "Your Profits"
        },
        STATUS: {
            Progress: "Under review",
            Received: "Data confirmed",
            Verified: "Claim submitted",
            Completed: "Collected"
        }
    },
    DATA_PAGE: {
        PROJECT_COUNT: "Count of projects ",
        PHASES: "Phases",
        ACCOUNT: "Account :",
        ADVANCED: "Advanced",
        UN_READED: "Unread",
        READ: "Read",
        LE: "LE",
        KEY_ACCOUNT: "Key Account",
        LOAD_MORE: "Load More ...",
        DISCOUNT: "Discount",
        LABELS: {
            DELIVERY: "Delivery",
            CLUB_FEES: "Club Fees",
            CASH_DISCOUNT: "Cash Discount",
            MAINTANCE: "Maintance",
            PARKING_FEES: "Parking Fees",
            DOWN_PAYMENT: "Down Payment",
            BEDROOMS: "Bedrooms",
            ProjectName: "Project Name",
            OriginalPrice: "Original Price",
            OfferDiscount: "Offer Discount",
            FinalPrice: "Final Price",
            Type: "Type",
            Area: "Area",
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
            1: "Available",
            2: "Launching",
            3: "Available", // Custom
            4: "Launching", // custom
            5: "Not Available"
        },
        STATUS_MESSAGES: {
            3: "Theres no details for available units at the moment - For any request please contact the Developer",
            4: "The project is in the launching now \n for available details please contact the developer.",
            5: "Not available now"
        },
        STATUS_REPLACE: {
            3: "by request",
            4: "Soon",
            5: "Not available"
        },
        PAY_PALN_TYPES: {
            1: "Equal",
            2: "Front Loaded",
            3: "Back Loaded"
        },
        VIEWS: {
            MATRIAL: {
                Brochure: "Brochure",
                Contract: "Contract",
                MasterPlan: "Master Plan",
                Photos: "Photos",
                Description: "Description"
            }
        },
        TABS: {
            OLD_VERSION: [
                {
                    Label: "Basic",
                    Value: "Basic"
                },
                {
                    Label: "Details",
                    Value: "Details"
                }
            ],
            SECTIONS: [
                {
                    ViewLabel: "Residential",
                    label: "Residential",
                    value: 1,
                    id: 1
                },
                {
                    ViewLabel: "Commercial",
                    label: "Commercial",
                    value: 2,
                    id: 2
                }
            ]
        },
        ACTIONS: {
            PAYMENT_PLAN: "Payment Plans",
            CONTACTS: "Contacts",
            OFFERS: "Offers and News",
            CITYSCAPE: "CityScape",
            NOTES: "Notes",
            DESCRIPTION: "Description",
            LAYOUTS: "Layouts",
            MATRILAS: "All Matrials",
            PRICELIST: "Price List",
            URL: "Videos",
            Location: "Location",
            PAY_PLAN_NOTE_HEAD: "Note :",
            PAY_PLAN_NOTE: "Please note that current prices are after discount."
        },
        MESSAGES: {
            NO_MESSAGE: "Theres no Message For This Compound",
            NO_URL: "Theres no Url For This Compound",
            CITYSCAPE: "To know the offers of the payment system, please open the price report"
        },
        OPTIONS: {
            ORDER: [
                {
                    Label: "Price",
                    Value: "DataMinUnitPrice"
                },
                {
                    Label: "Bedrooms",
                    Value: "DataBedRooms"
                },
                {
                    Label: "Delivery",
                    Value: "DataDeliveryFrom"
                },
                {
                    Label: "Last Update",
                    Value: "DataDate"
                }
            ],
            ADDITIONAL: [
                {
                    Label: "ExtraBenefits",
                    Value: "ExtraBenefits"
                },
                {
                    Label: "Engineering",
                    Value: "Engineering"
                },
                {
                    Label: "Architecture",
                    Value: "Architecture"
                },
                {
                    Label: "Executive",
                    Value: "Executive"
                },
                {
                    Label: "Management",
                    Value: "Management"
                }
            ]
        },
        EXTRA_BENFITS: {
            1: "Advance Yield",
            2: "Installment Yield",
            3: "Mandatory Rent",
            4: "Rent Authorization"
        },
        PAY_MODAL: {
            BULK: "Bulk {{INDEX}}",
            1: "1st Installment",
            2: "2nd Installment",
            3: "3rd Installment",
            4: "{{INDEX}}th Installment"
        }
    },
    SETTINGS_PAGE: {
        USER_NAME: "Whatsapp Name",
        NUMBER: "Whatsapp Number",
        DELETE_SESSION: "Delete Connection",
        TABS: [
            {
                Label: "Account",
                Value: 1
            },
            {
                Label: "Whatsapp Connection",
                Value: 2
            }
        ]
    },
    DASHBOARD_PAGE: {
        USERS: "Users",
        TABS: [
            {
                Label: "Users",
                Value: 1
            },
            {
                Label: "Companies V1",
                Value: 2
            }
        ],
        OPTIONS: {
            FILTER: [
                {
                    Name: "User Name",
                    Value: "UserName"
                },
                {
                    Name: "Title",
                    Value: "UserJobTitle"
                },
                {
                    Name: "WhatsApp",
                    Value: "UserPhoneNumber"
                },
                {
                    Name: "Email Adress",
                    Value: "UserEmail"
                }
            ],
            JOB_TITLE: [
                { Name: "Choose", Value: "" },
                { Name: "Junior Sales", Value: "Junior Sales" },
                { Name: "Senior Sales", Value: "Senior Sales" },
                { Name: "Team Leader", Value: "Team Leader" },
                { Name: "Sales Supervisor", Value: "Sales Supervisor" },
                { Name: "Sales Manager", Value: "Sales Manager" },
                { Name: "Sales Director", Value: "Sales Director" },
                { Name: "Head Of Sales", Value: "Head Of Sales" },
                { Name: "CEO", Value: "CEO" }
            ]
        }
    },
    TABLES: {
        DataDate: "Last update",
        DataDeveloper: "Developer",
        DataCompound: "Compound",
        DataCompoundId: "Project",
        DataStatus: "Status",
        DataArea: "Locations",
        DataAcres_ProjectArea: "Acres",
        DataPolicy: "Co. Policy",
        DataSubType: "Type",
        DataBedRooms: "bedrooms",
        DataBuiltUpAreaFrom: "Built up area",
        DataUnitTotalPriceFrom: "Original Price ( from - to )",
        DataUnitTotalPriceDiscountFrom: "Cash Price ( from - to )",
        Name: "Name",
        Number: "Number",
        Tools: "Tools",
        Username: "Username",
        Title: "Title",
        WhatsApp: "WhatsApp",
        EmailAdress: "Email Adress",
        TotalCommission: "Total Commission",
        SalesUnitPrice: "Unit Price",
        SalesUnitType: "Unit Type",
        SalesProject: "Project",
        SalesDeveloper: "Developer",
        SalesCreatedAt: "Request Date",
        Type: "Type",
        Bua: "Bua",
        InstallmentPrice: "Installment Price",
        CachPrice: "Cach Price",
        DownPayment: "Down Payment",
        Monthly: "Monthly",
        Outdoor: "Outdoor",
        // ---- New ----
        Installment: "Installment",
        Ammount: "Ammount",
        DueDate: "Due Date",
        Total: "Total"
    },
    VALIDATION: {
        EMAIL_REQUIRED: "Email is required",
        EMAIL_INVALID: "Email is invalid",
        PHONE_NUMBER_REQUIRED: "Phone Number is required",
        PHONE_NUMBER_INVALID: "Phone Number is invalid",
        USERNAME_REQUIRED: "Username is required",
        USERNAME_LENGTH: "User Name must be at least 1 character long",
        USERNAME_INVALID: "User Name must contain at least one letter",
        PASSWORD_REQUIRED: "Password is required",
        PASSWORD_LENGTH: "Password must be greater than or equal to 6 characters",
        PASSWORD_INVALID: "Password must contain both numbers and letters",
        PASSWORD_DIDNOT_MATCH: "Password Doesn't Match",
        OLD_PASSWORD_REQUIRED: "Old Password is required",
        NEW_PASSWORD_REQUIRED: "New Password is required",
        CONFIRM_NEW_PASSWORD_REQUIRED: "Confirm New Password is required",
        PASSWORDS_NOT_MATCH: "Password Doesn't Match Confirm Password",
        ACCOUNT_TYPE_REQUIRED: "Account Type is required",
        COMPANY_NAME_REQUIRED: "Company Name is required",
        COMPANY_NAME_LENGTH: "Company Name must be at least 2 character long",
        COMPANY_NAME_INVALID: "Company Name must contain at least one letter",
        USERS_COUNT_REQUIRED: "Users Count is required",
        SECTIONS_LENGTH: "Sections Can't Be Leth Than 1",
        SECTION_IS_EMPTY: "{{Key}} Cities Can't Be Leth Than 1 While You Chose {{Key}} Section",
        PLAN_REQUIRED: "Plan is required",
        JOB_TITLE_REQUIRED: "Job Title is required",
        FILES_REQUIRED: "Please Select At Least One File",
        MESSAGE_REQUIRED: "Message Is Required",
        FILE_REQUIRED: "File Is Required",
        PHONE_NUMBER_STARTS_WITH: "Number Starts With Contry Code",
        SALES_DEVELOPER_REQUIRED: "Please Choose Developer",
        SALES_PROJECT_REQUIRED: "Please Choose Project",
        SALES_DATE_REQUIRED: "Please Input Sales Date",
        SALES_UNIT_PRICE_REQUIRED: "Please Input Unit Price",
        SALES_UNIT_TYPE_REQUIRED: "Please Input Unit Type",
        SALES_CUSTOMER_REQUIRED: "Please Input Customer Name",
        SALES_EXECUTIVE_REQUIRED: "Please Input Sales Executive Name"
    },
    ERRORS: {
        NO_COORDINATES: "There are no coordinates for {{Compound}}",
        NO_URL: "There are no Orientation for {{Compound}}",
        NO_DESCRIPTION: "There are no Description for {{Compound}}",
        NO_CONTACTS: "No Contacts Yet For {{Developer}}",
        CDN_UNAVILABLE: "Viewing File Is Unavailable Please Contact Admin With Code : 199404",
        SERVIES_UNAVILABLE: "Services Is Unavailable \n Please Contact Admin \n With Code : 199405",
        FILE_VIEW_NOT_ALLOWED:
            "This File Can't Be Viewed \n We Are Not Supported This File Type Right Now,\n Plaese Download It",
        NOT_ALLOWED_SECTION: "You Need To Choose {{Key}} Section First",
        NO_NOTIFICATIONS: "No Notifications Now",
        PHONE_NUMBER_STARTS_WITH: "Number Starts With Contry Code",
        NO_CONNECTION: "No Connection Found For {key} Please Make Sure You Are Connected",
        NO_CITIES_FOUND: "No Cities Found For This Section Please Contact Admin",
        NO_SUBSCRIPTION_FOUND: "You Didn't Subscribe To ( {{KEY}} ) Yet Please Subscribe First",
        RESET_SECTION_EMPTY: "There Are No Data To Reset"
    }
};

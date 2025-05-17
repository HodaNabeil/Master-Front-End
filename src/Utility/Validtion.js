class Validation {
    static PasswordRequiredCheck = (pass, ignore) => {
        if (ignore) {
            return false;
        }
        let reg = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        if (!pass) return "PASSWORD_REQUIRED";
        if (pass?.length < 6) {
            return "PASSWORD_LENGTH";
        } else if (!reg.test(pass)) {
            return "PASSWORD_INVALID";
        }
        return false;
    };
    static EmailCheckRegex = (email, ignore) => {
        if (ignore) return false;
        if (!email) return "EMAIL_REQUIRED";

        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reg.test(email)) {
            return "EMAIL_INVALID";
        }

        return false;
    };
    static PhoneNumberCCodeRequiredCheck = (Code, ignore) => {
        if (ignore) return false;
        if (!Code) return "PHONE_NUMBER_STARTS_WITH";
        return false;
    };
    static PhoneNumberRequiredCheck = (number, ignore) => {
        if (ignore) return false;
        if (!number) return "PHONE_NUMBER_REQUIRED";
        // if (!number) return "Phone number is required";
        if (number?.length < 10) {
            return "PHONE_NUMBER_INVALID";
            // return "Phone number is invalid";
        }
        return false;
    };
    static UserNameRequiredCheck(userName, ignore) {
        if (ignore) return false;
        if (!userName) {
            return "USERNAME_REQUIRED";
            // return "User Name is required";
        } else if (userName.length < 1) {
            return "USERNAME_LENGTH";
            // return "User Name must be at least 1 character long";
        } else if (!/[A-Za-z]/.test(userName)) {
            return "USERNAME_INVALID";
            // return "User Name must contain at least one letter";
        }
        return false;
    }
    static Login(state) {
        let errors = [];
        const PhoneValidate = this.PhoneNumberRequiredCheck(state.Method, false);
        if (PhoneValidate) {
            errors.push(PhoneValidate);
        }
        if (!state.Password) {
            errors.push("PASSWORD_REQUIRED");
            // errors.push("Password is required");
        }
        return errors;
    }
    // ======================    Register  =============================
    static StepOneRegister = (state) => {
        let errors = [];
        const UserNameValidate = this.UserNameRequiredCheck(state.UserName, false);
        if (UserNameValidate) {
            errors.push(UserNameValidate);
        }
        const EmailValidate = this.EmailCheckRegex(state.UserEmail, false);
        if (EmailValidate) {
            errors.push(EmailValidate);
        }
        const PhoneCodeValidate = this.PhoneNumberCCodeRequiredCheck(state?.UserCountryCode, false);
        if (PhoneCodeValidate) {
            errors.push(PhoneCodeValidate);
        }
        const PhoneValidate = this.PhoneNumberRequiredCheck(state.UserPhoneNumber, false);
        if (PhoneValidate) {
            errors.push(PhoneValidate);
        }
        const PassValidate = this.PasswordRequiredCheck(state.UserPassword, false);
        if (PassValidate) {
            errors.push(PassValidate);
        }
        return errors;
    };
    static StepTwoRegister = (state, IsCompany) => {
        let errors = [];
        if (!state.UserRoleId) {
            errors.push("ACCOUNT_TYPE_REQUIRED");
            // errors.push("Account Type is required");
        }
        if (IsCompany) {
            if (!state.UserCompanyName) {
                errors.push("COMPANY_NAME_REQUIRED");
                // errors.push("Company Name is required");
            } else if (state.UserCompanyName.length < 2) {
                errors.push("COMPANY_NAME_LENGTH");
                // errors.push("Company Name must be at least 2 characters long");
            } else if (!/[A-Za-z]/.test(state.UserCompanyName)) {
                errors.push("COMPANY_NAME_INVALID");
            }
            if (!state.UserSubUsersCount) {
                errors.push("USERS_COUNT_REQUIRED");
                // errors.push("Users Count is required");
            }
        }
        return errors;
    };
    // Step 3
    static Register = (state) => {
        const errors = [];
        const { UserSections, Residential, Commercial, UserPlan } = state || {};
        const IsSectionsEmpty = UserSections?.length == 0;
        const IsEmpty = {
            Residential: Residential?.length == 0,
            Commercial: Commercial?.length == 0
        };
        const SelectedSections = UserSections?.map((x) => x.SectionKey);
        if (IsSectionsEmpty) {
            errors.push("SECTIONS_LENGTH");
        }
        Object.entries(IsEmpty)?.map(([Key, Value]) => {
            if (Value && SelectedSections.includes(Key)) {
                errors.push("SECTION_IS_EMPTY." + Key);
            }
        });
        if (!UserPlan || UserPlan == "") {
            errors.push("PLAN_REQUIRED");
        }
        return errors;
    };
    static Forget = (state) => {
        const errors = [];
        const PhoneValidate = this.PhoneNumberRequiredCheck(state.UserPhoneNumber, false);
        if (PhoneValidate) {
            errors.push(PhoneValidate);
        }
        return errors;
    };
    static Reset = (state) => {
        const errors = [];
        const PassValidate = this.PasswordRequiredCheck(state.UserPassword, false);
        if (PassValidate) {
            errors.push(PassValidate);
        }
        const PassValidateRetype = this.PasswordRequiredCheck(state.RetypePassword, false);
        if (PassValidateRetype) {
            errors.push(PassValidateRetype);
        }
        if (state.UserPassword !== state.RetypePassword) {
            errors.push("PASSWORD_DIDNOT_MATCH");
        }
        return errors;
    };
    static Profile = (State) => {
        const errors = [];
        if (!State.OldPassword) {
            errors.push("OLD_PASSWORD_REQUIRED");
        }
        const PassValidateRetype = this.PasswordRequiredCheck(State.NewPassword, false);
        if (PassValidateRetype) {
            errors.push(PassValidateRetype);
        }
        if (!State.ConfirmNewPassword) {
            errors.push("CONFIRM_NEW_PASSWORD_REQUIRED");
        }
        if (State.NewPassword != State.ConfirmNewPassword) {
            errors.push("PASSWORDS_NOT_MATCH");
        }
        return errors;
    };
    static SubUser = (state, IsEdit) => {
        const errors = [];
        const { UserSections, Residential, Commercial, UserJobTitle } = state || {};
        const UserNameValidate = this.UserNameRequiredCheck(state.UserName, false);
        if (UserNameValidate) {
            errors.push(UserNameValidate);
        }
        const EmailValidate = this.EmailCheckRegex(state.UserEmail, false);
        if (EmailValidate) {
            errors.push(EmailValidate);
        }
        if (!UserJobTitle) {
            errors.push("JOB_TITLE_REQUIRED");
        }
        const PhoneValidate = this.PhoneNumberRequiredCheck(state.UserPhoneNumber, false);
        if (PhoneValidate) {
            errors.push(PhoneValidate);
        }
        const IsSectionsEmpty = UserSections?.length == 0;
        const IsEmpty = {
            Residential: Residential?.length == 0,
            Commercial: Commercial?.length == 0
        };
        const SelectedSections = UserSections?.map((x) => x.SectionKey);
        if (IsSectionsEmpty) {
            errors.push("SECTIONS_LENGTH");
        }
        Object.entries(IsEmpty)?.map(([Key, Value]) => {
            if (Value && SelectedSections.includes(Key)) {
                errors.push("SECTION_IS_EMPTY." + Key);
            }
        });
        const PassValidate = this.PasswordRequiredCheck(state.UserPassword, IsEdit);
        if (PassValidate) {
            errors.push(PassValidate);
        }
        return errors;
    };
    static WhatsAppSender = (State, Type) => {
        const errors = [];
        const { To, Message, FileUrl, Files } = State || {};
        const ValidateTo = this.PhoneNumberRequiredCheck(To);
        if (ValidateTo) errors.push(ValidateTo);
        let MessageTypes = ["Coordinates"];
        if (MessageTypes.includes(Type) && !Message) {
            errors.push("MESSAGE_REQUIRED");
        }
        if (Type === "List" && Files.length === 0 && !Message) {
            errors.push("FILES_REQUIRED");
        }
        if (Type == "Single" && !FileUrl) {
            errors.push("FILE_REQUIRED");
        }
        return errors;
    };
    static Sales = (Form) => {
        const errors = [];
        const {
            Tab,
            SalesDeveloper,
            SalesProject,
            SalesCustomer,
            SalesExecutive,
            SalesDate,
            SalesUnitPrice,
            SalesUnitType,
            Files = []
        } = Form || {};
        if (Tab == "Add") {
            if (Files.length == 0) errors.push("FILES_REQUIRED");
            if (!SalesDeveloper || !SalesDeveloper?.value) errors.push("SALES_DEVELOPER_REQUIRED");
            if (!SalesProject || !SalesProject?.value) errors.push("SALES_PROJECT_REQUIRED");
        }
        if (!SalesDate) errors.push("SALES_DATE_REQUIRED");
        if (!SalesUnitType || !SalesUnitType?.value) errors.push("SALES_UNIT_TYPE_REQUIRED");
        if (!SalesUnitPrice) errors.push("SALES_UNIT_PRICE_REQUIRED");
        if (!SalesCustomer) errors.push("SALES_CUSTOMER_REQUIRED");
        if (!SalesExecutive) errors.push("SALES_EXECUTIVE_REQUIRED");
        return errors;
    };
}
export default Validation;

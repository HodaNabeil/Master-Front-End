import { startTransition } from "react";
const date = new Date();
class Helper {
    static DeveloperImgExtintion = window.Config?.DeveloperImgExtintion
        ? window.Config.DeveloperImgExtintion
        : "webp";
    static WhatsAppTime = 0.5;
    static TimeToExpire = 4; // in days
    static DayDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    static Locals = [
        {
            Label: "English",
            Value: "en"
        },
        {
            Label: "العربية",
            Value: "ar"
        }
    ];
    static Cities = {
        1: "New Cairo",
        2: "New Capital",
        3: "Al-Mostakbal",
        4: "Al-Shorouk",
        5: "6th October",
        6: "North Coast",
        7: "Ain Sokhna"
    };
    static StatusColor = {
        1: "green.400",
        2: "blue.400",
        3: "blue.400",
        4: "blue.400",
        5: "red.400"
    };
    static FormatDateArabic(date = new Date()) {
        const Lang = this.GetStorage("Lang");
        const Monthes = {
            ar: [
                "يناير",
                "فبراير",
                "مارس",
                "ابريل",
                "ماي",
                "يونيو",
                "يوليو",
                "اغسطس",
                "سبتمبر",
                "اكتوبر",
                "نوفمبر",
                "ديسمبر"
            ],
            en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        };
        const day = date.getDate();
        const year = date.getFullYear();
        const month = Monthes[Lang ? Lang : "en"][date.getMonth()];
        return `${day}/${month}/${year}`;
    }
    static ReplaceNumbersToArabic(Text) {
        if (!Text) return "";
        return Text.replaceAll("%", "٪");
        //     .replaceAll("0", "٠")
        //     .replaceAll("1", "١")
        //     .replaceAll("2", "٢")
        //     .replaceAll("3", "٣")
        //     .replaceAll("4", "٤")
        //     .replaceAll("5", "٥")
        //     .replaceAll("6", "٦")
        //     .replaceAll("7", "٧")
        //     .replaceAll("8", "٨")
        //     .replaceAll("9", "٩");
    }
    static ToggleFullScreen = (FullScreenElement, setIsFullScreen) => {
        if (!FullScreenElement) return;
        const elem = FullScreenElement.current;
        const isFull = document.fullscreenElement;
        if (!isFull) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            startTransition(() => {
                setIsFullScreen(true);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            startTransition(() => {
                setIsFullScreen(false);
            });
        }
    };
    static GetSectionByIdOrName(NameOrId) {
        const Data = {
            1: "Residential",
            2: "Commercial",
            Residential: 1,
            Commercial: 2
        };
        return Data[NameOrId];
    }
    static ValidateStatus = (Lang, DataStatus) => {
        const AllMerged = ["5", 5];
        const CustomStatus = ["3", "4", 3, 4];
        if (!DataStatus)
            return {
                IsAllowed: false,
                Message:
                    Lang?.DATA_PAGE?.STATUS_REPLACE?.["5"] || Lang?.DATA_PAGE?.STATUS_REPLACE?.[5]
            };
        if (AllMerged.includes(DataStatus)) {
            return {
                IsAllowed: false,
                Message: Lang?.DATA_PAGE?.STATUS_REPLACE?.[DataStatus]
            };
        }
        if (CustomStatus.includes(DataStatus)) {
            return {
                IsAllowed: false,
                Message: Lang?.DATA_PAGE?.STATUS_REPLACE?.[DataStatus]
            };
        }
        return {
            IsAllowed: true,
            Message: ""
        };
    };
    static SortBy = (function () {
        const toString = Object.prototype.toString,
            // default parser function
            Parse = function (x) {
                return x;
            },
            // gets the item to be sorted
            GetItem = function (x) {
                var isObject = x != null && typeof x === "object";
                var isProp = isObject && this.prop in x;
                return this.parser(isProp ? x[this.prop] : x);
            };

        /**
         * Sorts an array of elements.
         *
         * @param  {Array} array: the collection to sort
         * @param  {Object} cfg: the configuration options
         * @property {String}   cfg.prop: property name (if it is an Array of objects)
         * @property {Boolean}  cfg.desc: determines whether the sort is descending
         * @property {Function} cfg.parser: function to parse the items to expected type
         * @return {Array}
         */
        return function sortby(array, cfg) {
            if (!(Array.isArray(array) && array?.length)) return [];
            if (toString.call(cfg) !== "[object Object]") cfg = {};
            if (typeof cfg.parser !== "function") cfg.parser = Parse;
            cfg.desc = !cfg.desc ? -1 : 1;
            return array.sort(function (a, b) {
                a = GetItem.call(cfg, a);
                b = GetItem.call(cfg, b);
                return cfg.desc * (a < b ? -1 : +(a > b));
            });
        };
    })();
    static async Waiter(time) {
        await new Promise((resolve) => setTimeout(resolve, time));
    }
    static ValidateNumber(Num = "") {
        if (typeof Num != "string") Num = Num.toString();
        return Num.startsWith("+") ? Num.slice(1) : Num;
    }
    static ValidateErrorMessage(Err) {
        if (Err?.status == "FETCH_ERROR") {
            return "Failed to fetch Code : 199406";
        }
        if (Err?.name == "TypeError") {
            return "Failed to fetch Code : 199407";
        }
        return Err.data?.message || Err?.message || "Failed to fetch Code : 199408";
    }
    static IsArabic(text) {
        if (text === "") {
            return false;
        } else {
            var arabic = /[\u0600-\u06FF]/;
            const res = arabic.test(text);
            return res;
        }
    }
    static IsURL(text) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(text);
    }
    static IsEmail(email) {
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
    static GetStorage(key) {
        try {
            const ls = JSON.parse(localStorage.getItem("browserData")) || {};
            return ls[key];
        } catch {
            return null;
        }
    }
    static SetStorage(key, value) {
        try {
            const ls = JSON.parse(localStorage.getItem("browserData")) || {};
            localStorage.setItem(
                "browserData",
                JSON.stringify({
                    ...ls,
                    [key]: value
                })
            );
        } catch {
            return null;
        }
    }
    static RemoveStorage(key) {
        try {
            const ls = JSON.parse(localStorage.getItem("browserData")) || {};
            delete ls[key];
            localStorage.setItem("browserData", JSON.stringify(ls));
        } catch {
            return null;
        }
    }
    static ClearStorage() {
        Helper.RemoveStorage("User");
    }
    static FormatBytes(bytes) {
        const decimals = 2;
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
    static GetScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    static HandleDate(date, Hours = true) {
        const d = new Date(date);
        if (Hours) {
            const hours = d.getHours();
            const minutes = d.getMinutes();
            const isPm = hours >= 12;
            const time = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${
                isPm ? "PM" : "AM"
            }`;
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${time}`;
        }
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }
    static HandleMomentDate = (inputDateString, IsDatetimeLocal = false) => {
        if (typeof inputDateString == "number") {
            const isMilliseconds = inputDateString >= 1000000000;
            inputDateString = isMilliseconds ? inputDateString : inputDateString * 1000;
        }
        const validDate = inputDateString ? new Date(inputDateString) : new Date();
        if (isNaN(validDate.getTime())) {
            throw new Error("Invalid date");
        }
        const options = { timeZone: "Africa/Cairo" };
        const cairoDate = new Date(validDate.toLocaleString("en-US", options));
        const cairoDateString = `${cairoDate.getFullYear()}-${String(
            cairoDate.getMonth() + 1
        ).padStart(2, "0")}-${String(cairoDate.getDate()).padStart(2, "0")}`;
        const cairoTimeString = `${String(cairoDate.getHours()).padStart(2, "0")}:${String(
            cairoDate.getMinutes()
        ).padStart(2, "0")}:${String(cairoDate.getSeconds()).padStart(2, "0")}`;
        return IsDatetimeLocal ? `${cairoDateString}T${cairoTimeString}` : cairoDateString;
    };
    static DownloadFile(DataUrl, FileName) {
        try {
            const [header, base64String] = DataUrl.split(",");
            const mimeType = header.match(/:(.*?);/)[1];
            const binaryString = atob(base64String);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: mimeType });
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = FileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch {
            // console.error("Download failed:", error);
        }
    }
    static DownloadFileFromLink(DataUrl) {
        try {
            let validUrl = DataUrl?.includes("?")
                ? `${DataUrl}&Download=true`
                : `${DataUrl}?Download=true`;
            const a = document.createElement("a");
            a.href = validUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch {
            // console.error("Download failed:", error);
        }
    }
    static PrintImage(url, title) {
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        iframe.contentDocument.write(
            `<html><head><title>
          ${title ? title : "Print Image"}
          </title></head>
      <body><img src="${url}" style="width:100%;" />
          </body></html>`
        );
        iframe.contentDocument.close();
        iframe.contentWindow.print();
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 1000);
    }
    static Normalize(str) {
        if (!str) {
            return "";
        }
        if (str && typeof str !== "string") {
            str = str.toString();
        }
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    }

    static InArray(array, value) {
        return array.includes(value);
    }
    static NumberWithCommas = (x) => {
        if (!x || x == "" || x == "null") return "";
        let StrToString = x?.toString()?.replaceAll(",", "");
        return StrToString?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    static HandlePayPlanDiscount = (Discount, Price, Bua) => {
        // Discount = Discount < 101 ? Discount / 100 : Discount;
        if (Discount == 0) return Price;
        if (Discount < 101) {
            let DiscountPrice = Price * Discount;
            return (Price - DiscountPrice)?.toFixed(0);
        }
        let DiscountPrice = Discount * Bua;
        return (Price - DiscountPrice)?.toFixed(0);
    };
    static ExtractBulks = (text = "") => {
        const regex = /-\s*\((\d+)%\)\s*after\s*(.*?)\s*(\d+)\s*months/gi;
        const result = [];
        let match;
        while ((match = regex.exec(text)) !== null) {
            if (!isNaN(Number(match[3]))) {
                result.push({
                    present: Number(match[1]),
                    month: Number(match[3])
                });
            }
        }
        return result;
    };
    static ConvertToFloat = (str) => {
        let body = str;
        let sign = "";
        const signMatch = /^\s*(-|\+)/.exec(str);
        // Or if you don't want to support unary +:
        // const signMatch = /^\s*(-)/.exec(str);
        if (signMatch) {
            // eslint-disable-next-line no-unused-vars
            body = str.substring(signMatch.index + 1);
            sign = signMatch[1];
        }
        const updatedBody = str.replace(/[^\d.]/g, "");
        const num = parseFloat(sign + updatedBody);
        return num;
    };
}

export default Helper;

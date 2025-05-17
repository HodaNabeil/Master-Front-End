import { extendTheme } from "@chakra-ui/react";
import { Button } from "./ThemeButton";
import { ThemeColors } from "./Colors";

// =========================== Change Classe =====================================
const styles = {
    global: ({ colorMode }) => {
        const IsDark = colorMode == "dark";
        return {
            ":root": {
                "--menu-bg": IsDark ? "cyan.500" : "cyan.900"
            },
            // ================================  Start  Class Public  =======================================
            ".Active-State-Color": {
                color: ThemeColors.ActiveStateColor[colorMode]
            },
            ".Nav-Icon-Color": {
                color: IsDark ? "#487998 !important" : "#fefdfb !important"
            },
            ".flex_between": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            },
            ".flex_center": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            // ================================  End  Class Public  =======================================
            html: {
                scrollBehavior: "smooth"
            },
            "::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
                borderRadius: "15px"
            },
            "::-webkit-scrollbar-thumb": {
                background: `${
                    ThemeColors.OldDataMainBg[IsDark ? "light" : "dark"]
                } url("/Img/${colorMode}/Scroll-Arrow.webp") no-repeat center center`,
                backgroundSize: "15px",
                borderRadius: "15px"
            },
            "::-webkit-scrollbar-track": {
                backgroundColor: ThemeColors.OldDataMainBg[colorMode],
                border: "1px solid slategrey",
                borderRadius: "15px"
            },
            "::-webkit-scrollbar-corner": {
                backgroundColor: ThemeColors.OldDataMainBg[colorMode],
                border: "1px solid slategrey",
                borderRadius: "15px",
                width: "1px",
                height: "1px"
            },
            ".Shadow": {
                border: "1px solid !important",
                borderColor: IsDark ? "rgba(240, 240, 240, 0.30) !important" : "rgba(0, 0, 0, 0.30) !important"
            },
            "* > option , * > optgroup , chakra-select > option": {
                background: ThemeColors.OldDataMainBg[colorMode],
                color: IsDark ? "gray.50" : "black"
            },
            ".shadow": {
                border: "1px solid !important",
                borderColor: IsDark ? "#4b4b4b8a !important" : "rgba(0, 0, 0, 0.30) !important"
            },
            ".Logo": {
                background: "#0a0808e8"
            },
            // ============           ===============

            ".Main-Sidebar": {
                background: ThemeColors.OldDataMainBg[colorMode],
                // backgroundColor: IsDark ? "#687a99" : "#dfeaf5",
                color: IsDark ? "#ececec" : "#0a0808e8"
            },
            ".BtnTogleSideBar": {
                width: "20px",
                height: "20px",
                borderRadius: "2px",
                backgroundColor: IsDark ? "#687a99" : "#dfeaf5",
                color: IsDark ? "#ececec" : "#0a0808e8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            ".BoxPriceItem": {
                background: IsDark ? "#c9e5f6" : ThemeColors.IconPriceBgColor.light,

                color: IsDark ? ThemeColors.IconPriceColor.dark : ThemeColors.IconPriceColor.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                padding: "3px  8px",
                borderRadius: "50px",
                height: "20px"
            },

            ".CenteredIconButton": {
                top: "50%",
                left: " 50%",
                position: " absolute",
                transform: "translate(-50%, -50%)",
                margin: "0",
                color: IsDark ? "#fefdfb" : "#487998"
            },
            // """""""""""""""" ****** App ****""""""""""""""""""""""""""""
            ".MainAppBgColor": {
                backgroundColor: IsDark ? "#0e2d3f !important" : "#d1e7f5 !important"
            },
            ".BgActive": {
                backgroundImage: IsDark
                    ? " linear(to right, #305166,#305166)"
                    : "linear(to-b, rgba(202,222,255,1) 0%,rgba(148,187,233,1) 100%)"
            },
            ".BgActive-Wrap": {
                background: "#47bb77"
            },

            // """"""""""""""""""   CardO ptions Result User """"""""""""""""""""""""""""
            ".LabelResultUser": {
                color: ThemeColors.MainColor[colorMode],
                fontWeight: "extrabold",
                paddingLeft: "3px",
                fontSize: "19px"
            },
            ".LabelAreaReultUser": {
                color: IsDark ? "#e7ebed" : "#4b7a95",
                fontWeight: "600 important",
                padding: " 0 2px",
                fontSize: "14px"
            },

            ".PaymenPlan-ModalOverlay ": {
                backgroundColor: IsDark ? "#3f8fbfad" : "#3f8fbfad",
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100vh"
            },
            ".Navbar .PhoneInputInput": {
                border: "1px solid #cfe1ebed !important",
                padding: " 3px 6px !important",
                borderRadius: "40px !important",
                color: ThemeColors.MainColor[colorMode],
                fontSize: "17px",
                fontWeight: "700 !important"
            },
            // """""""""""""""""""" Start Modal Payment Plan"""""""""""""""""""""""""""""""""
            ".Modal-Content-payment-Plan": {
                width: "600px",
                padding: "30px",
                margin: "auto",
                height: "500px"
            },
            ".Header-Payment-Method": {
                fontSize: "24px",
                color: IsDark ? "#fefdfb" : "#487998"
            },

            ".Label-Payment-Plan": {
                backgroundColor: "#eeee",
                padding: "3px 6px",
                width: "180px",
                // marginTop: "30px",
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "18px",
                color: ThemeColors.ModlePaymentColor[colorMode]
            },
            ".Small-Label-Payment-Plan": {
                textTransform: "capitalize",
                fontWeight: "bold",
                fontSize: "18px",

                color: IsDark ? "#fefdfb" : "#487998"
            },

            ".Input-Payment-Plan": {
                borderRadius: "4px !important",
                fontSize: "18px !important",
                height: "30px !important",
                padding: "4px 2px !important",
                color: IsDark ? "white" : "black"
            },
            // """"""""""""""""Card-Reuslt-Serach""""""""""""""""""""
            ".Card-Reuslt-Serach": {
                backgroundColor: ThemeColors.CardResultSerach[colorMode],
                borderRadius: "10px",
                border: "2px solid",
                borderColor: ThemeColors.CardResultBorderColor[colorMode]
            },
            ".Border": {
                border: "2px solid",
                borderColor: `${ThemeColors.CardResultBorderColor[colorMode]} !important`
            },
            ".Right-Box": {
                height: "auto",
                width: "100%",
                border: "2px solid",
                borderColor: `${ThemeColors.CardResultBorderColor[colorMode]} !important`,
                padding: "0"
            },

            ".Color-Title-Result-Search": {
                backgroundColor: IsDark ? "#1b5072" : "#a1cbde"
            },
            ".Card-Reuslt-Serach-Price": {
                color: IsDark ? "#fefdfb" : "#487998",
                fontWeight: "bold"
            },
            // """""""""""""" Menu Navbar"""""""""""""""""""""""
            ".Menu-Navbar-boxShadow": {
                boxShadow: IsDark
                    ? "0 0 0px 2px #4b7a95 !important "
                    : " 0 0 0px 2px #8fbad1 !important"
            },
            ".Menu-Navbar-MenuItem-Bg": {
                backgroundColor: IsDark ? "#0e2d3f !important" : "#d1e7f5 !important",
                color: IsDark ? "#f0f0f0 !important" : "#0e2d3f !important"
            },
            ".Menu-Navbar-MenuItem-Bg-Active": {
                // backgroundColor: IsDark ? "#0e2d3f !important" : "#d1e7f5 !important",
                backgroundColor: IsDark ? "#4b7a95 !important" : "#8fbad1 !important",
                color: IsDark ? "#f0f0f0 !important" : "#0e2d3f !important"
            },
            // Filter Button
            ".Filter-Button": {
                background: IsDark ? "#3ca568" : "#9dc79f",
                color: IsDark ? "#f0f0f0" : "#0e2d3f"
            },
            ".Filter-Button-Active": {
                background: IsDark ? "#9dc79f" : "#3ca568",
                color: IsDark ? "#f0f0f0" : "#0e2d3f"
            },
            // ======================== Table ===========================
            ".Thead": {
                background: ThemeColors.Table.Bg.THead[colorMode],
                color: ThemeColors.Table.Color.THead[colorMode]
            },
            ".Tr-Border": {
                borderBottom: "3px solid",
                borderTop: "3px solid",
                borderColor: "#00000000"
            },
            ".TBody-Tr": {
                background: ThemeColors.Table.Bg.BodyTr[colorMode],
                color: ThemeColors.Table.Color.BodyTr[colorMode]
            },
            ".TBody-Tr-Selected": {
                background: ThemeColors.Table.Bg.BodyTr.Selected[colorMode],
                color: ThemeColors.Table.Color.BodyTr.Selected[colorMode]
            },
            ".Item-Selected": {
                background: IsDark
                    ? ` linear-gradient(to right, #0e2d3f,rgb(16, 157, 238)) !important`
                    : ` linear-gradient(to right, #fefefe,rgba(24, 154, 230, 0.67)) !important`,
                color: ThemeColors.Table.Color.BodyTr.Selected[colorMode]
            },
            // Data Old  Page
            ".Main-Background": {
                // background: `${ThemeColors.OldDataMainBg[colorMode]} !important`,
                background: IsDark
                    ? ` linear-gradient(to bottom, #0e2d3f, #354f5e) !important`
                    : ` linear-gradient(to bottom, #fefefe, #bddcee) !important`
            },
            ".Main-Background-Top": {
                // background: `${ThemeColors.OldDataMainBg[colorMode]} !important`,
                background: IsDark ? `#0e2d3f !important` : `#fefefe !important`
            },
            ".Main-Background-Bottom": {
                // background: `${ThemeColors.OldDataMainBg[colorMode]} !important`,
                background: IsDark ? `#354f5e !important` : `#bddcee !important`
            },
            ".Main-Navbar": {
                // background: `${ThemeColors.OldDataMainBg[colorMode]} !important`,
                background: IsDark ? "#0e2d3f" : "#fefefe"
            },
            ".Main-Color": {
                color: `${ThemeColors.OldDataMainBg.Color[colorMode]} !important`
            },
            ".Tab": {
                background: `${ThemeColors.OldDataMainBg.Tab[colorMode]} !important`,
                color: "white !important"
            },
            ".Tab-Selected": {
                background: ThemeColors.OldDataMainBg.Tab.Selected[colorMode],
                color: "black"
            },
            ".Tab-Border": {
                border: "3px solid",
                borderColor: ThemeColors.OldDataMainBg[colorMode]
            },
            ".Locaion-Icon": {
                background: ThemeColors.OldDataMainBg.LocationButton[colorMode],
                color: `${ThemeColors.OldDataMainBg.LocationButton.Color[colorMode]} !important`
            },
            // =================== Modals ==========================
            ".Main-Modal": {
                background: `${ThemeColors.OldDataMainBg[colorMode]} !important`,
                color: `${ThemeColors.OldDataMainBg.Color[IsDark ? "light" : "dark"]} !important`
            },
            // ========================= Start Page  Setting =================================
            ".Container-Page-Setting": {
                backgroundColor: "#1a202c",
                height: "100vh",
                width: "100%"
            },
            ".Container-Profile": {
                backgroundColor: "#1a202c",
                padding: "1rem",
                width: "50%",
                height: "50%",
                boxShadow: "0 0 10px 2px #d3c8c836"
            },
            ".Btn-Setting": {
                borderBottom: "3px  solid !important",
                borderRadius: "0.75rem"
            },
            ".Container-Qr-Code": {
                width: "40%"
            },
            ".Active-btn-Setting": {
                backgroundColor: "#63b3ed !important"
            },
            // ================================ Sart  Dashboard Page ===============================
            ".Dashboard-Page": {
                backgroundColor: " #b5b5b3",
                height: "100vh",
                width: "100%"
            },
            // ".Container-Content-Dashboard": {
            //     display: "flex",
            //     justifyContent: "center",
            //     gap: "40px"
            // },
            ".Active-Btn-Dashboard": {
                backgroundColor: "#4f97d2 !important",
                borderRadius: "0px !important",
                borderColor: "#4f97d2 !important"
            },
            ".Btn-User-Dashboard": {
                backgroundColor: `${ThemeColors.Dashboard.User.BgBtn[colorMode]}  !important`,
                color: `${ThemeColors.SecoendColor[IsDark ? "light" : "dark"]} !important`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "1.7px",
                border: "none !important"
            },
            ".Select-Container-Users": {
                backgroundColor: `${ThemeColors.Dashboard.User.BgSelect[colorMode]}  !important`,
                border: "none !important"
            },
            ".Dashboard-Number-Users": {
                background: "#5f9bb7",
                padding: "4px 8px",
                fontWeight: "bold",
                color: "#fff"
            },
            // "User=>>>>> Table """
            ".Container-Table": {
                boxShadow: "0px 0px 2px 2px #999492 !important"
            },
            ".Dashboard-Thead": {
                backgroundColor: `${ThemeColors.Dashboard.User.Table.BgThead[colorMode]}  !important`
            },
            ".Table-Th": {
                color: `${ThemeColors.Dashboard.User.Table.ColorTh[colorMode]} !important`,
                borderRight: "1px solid #7e93a9 !important",
                textAlign: "center !important ",
                textTransform: "capitalize !important ",
                fontWeight: "bold !important",
                fontSize: "0.9rem !important"
            },
            ".Table-td ": {
                textAlign: "center !important ",
                borderColor: "#4a535d2e !important",
                color: `${ThemeColors.Dashboard.User.Table.Colortd[colorMode]} `,
                textTransform: "capitalize !important "
            },
            ".Table-td:not(:last-child)": {
                borderRight: "1px solid #4a535d2e !important"
            },
            // ================ Dashboard => Compainies ===============================
            ".Btn-Companies-Dashboard": {
                borderRadius: "4px",
                padding: "0.6rem 0.9rem ",
                backgroundColor: "red"
            },
            // =================   Start =>  AdditionalFeatures =========================
            ".Overlay-AdditionalFeatures": {
                position: "absolute !important",
                width: "100% !important",
                height: "100vh !important",
                backgroundColor: `${ThemeColors.Overlay[colorMode]} !important`,
                top: "0 !important",
                left: "0 !important"
            },
            ".Modal-Content-AdditionalFeatures": {
                padding: "40px "
            },
            ".Header-Modal-AdditionalFeatures": {
                backgroundColor: ThemeColors.AdditionalFeatures[colorMode],
                fontSize: "1.2rem",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                width: " 80%",
                margin: "auto",
                color: IsDark ? "#fff" : "#000",
                cursor: "pointer",
                fontWeight: "bold",
                position: "relative",
                marginBottom: "10px"
            },
            ".List-Modal-AdditionalFeatures": {
                backgroundColor: ThemeColors.AdditionalFeatures[colorMode],
                borderRadius: "4px",
                padding: "0.3rem 1.8rem",
                boxShadow: "#bcdcf9 0px 1px 7px 1px !important"
            },
            ".Item-List-Modal-AdditionalFeatures": {
                margin: "6px 0",
                fontWeight: "bold"
            },
            ".Icon-Header-Modal-AdditionalFeatures": {
                right: "10px",
                position: "absolute",
                fontweight: "bold",
                fontSize: "20px"
            }
        };
    }
};
// """""""""""""""Change Syntax  """""""""""""""""""""""""""
class Theme {
    static Init = extendTheme({
        config: {
            initialColorMode: "dark",
            useSystemColorMode: false
        },
        components: {
            Button
        },
        styles,
        colors: ThemeColors
        // breakpoints: {
        //     sm: "576px",
        //     md: "768px",
        //     lg: "992px",
        //     xl: "1200px",
        //     "2xl": "1400px"
        // }
    });
    static PublicConfig = {
        NavbarHeight: "5rem"
    };
}

export default Theme;

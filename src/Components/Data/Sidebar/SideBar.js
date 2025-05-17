class SideBarData {
    #Lang = null;
    #Options = {
        YearsLngth: 12,
        BedRoomsLngth: 9,
        DeliveryLngth: 5,
        DownPaymentLength: 11
    };
    constructor(
        Lang,
        Options = {
            YearsLngth: 12,
            BedRoomsLngth: 9,
            DeliveryLngth: 5,
            DownPaymentLength: 11
        }
    ) {
        this.#Lang = Lang;
        this.#Options = { ...Options };
    }
    BedRooms() {
        return Array.from({ length: this.#Options.BedRoomsLngth })?.map((_, i) => ({
            label: i + 1,
            value: i + 1,
            id: i + 1
        }));
    }
    Delivery() {
        const Options = Array.from({ length: this.#Options.DeliveryLngth })?.map((_, i) => ({
            label: `${i + 1} ${this.#Lang?.PUBLIC?.WORDS?.DELIVERY}`,
            value: i + 1,
            id: i + 1
        }));
        return [
            {
                label: this.#Lang?.PUBLIC?.WORDS?.DELIVERY_TITLE,
                value: 0,
                id: 0
            },
            ...Options
        ];
    }
    Years() {
        return Array.from({ length: this.#Options.YearsLngth })?.map((_, i) => ({
            label: `${i + 1} ${this.#Lang?.PUBLIC?.WORDS?.YEARS}`,
            value: i + 1,
            id: i + 1
        }));
    }
    DownPayment() {
        return Array.from({ length: this.#Options.DownPaymentLength }, (_, i) => ({
            label: `${i * 5}%`,
            value: parseFloat((i * 0.05)?.toFixed(2)),
            id: parseFloat((i * 0.05)?.toFixed(2))
        }));
    }
    Finishing() {
        return [
            {
                label: this.#Lang?.PUBLIC?.FINISHING[1],
                value: 1,
                id: 1
            },
            {
                label: this.#Lang?.PUBLIC?.FINISHING[0],
                value: 0,
                id: 0
            }
        ];
    }
    ExtraBenefits() {
        const LangData = this.#Lang?.DATA_PAGE?.EXTRA_BENFITS;
        return [
            {
                label: LangData?.[1],
                id: 1,
                value: 1
            },
            {
                label: LangData?.[2],
                id: 2,
                value: 2
            },
            {
                label: LangData?.[3],
                id: 3,
                value: 3
            },
            {
                label: LangData?.[4],
                id: 4,
                value: 4
            }
        ];
    }
}
export default SideBarData;

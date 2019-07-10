export default {

    settings() {
        return {
            monumentPrice : 0,
            portraitPrice: '',
            textPrice: '',
            sizeCoefficient : [
                {
                    value: 1,
                    label: '',
                    stand: '',
                    flowerGarden: ''
                }
            ],
            materialCoefficient : [
                {
                    value: '',
                    label: '',
                    href: ''
                }
            ]
        }
    },
    product() {
        return {
            title: '',
            description: '',
            details : {
                color: {value: 'all', label: 'All'},
                type: {value: '', label: ''},
                form: {value: '', label: ''},
            },
            price: 1,
            category: {value: 'all', label: 'All'},
            images: {
                black: '',
                red: '',
                white: '',
                gray: '',
            },
        }
    },
    work() {
        return {
            title: '',
            description: '',
            color: {value: '', label: ''},
            type: {value: '', label: ''},
            form: {value: '', label: ''},
            images: []
        }
    },
    mail() {
        return {
            name: '',
            phone: '',
            email: '',
            message: ''
        }
    },
    contract() {
        return {
            number: '',
            customForm: false,
            customer: {
                name: '',
                phone: '',
            },
            stone: {
                color: {value: '', label: '', href: ''},
                type: {value: '', label: ''},
                form: {value: '', label: '', href: ''},
                size: {value: '', label: ''},
            },
            extra: {
                stella: '',
                stand: '',
                tombstone: '',
                plate: '',
                vase: '',
                adds: '',
            },
            mainInfo: [
                {
                    firstName: '',
                    secondName: '',
                    lastName: '',
                    date: ''
                }
            ],
            otherInfo: {
                epitaph: '',
                portrait: '',
                text: '',
                cross: '',
                flowers: '',
                adds: '',
            },
            cemetery: {
                address: '',
                sector: '',
                place: ''
            },
            builder: {
                value: '',
                label: '',
                name: '',
                phone: '',
            },
            payments: 0,
            total: 0,
            install: '',
            deleted: false
        }
    }
}
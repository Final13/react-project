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
            price: '',
            category: {value: 'all', label: 'All'},
            image: ''
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
            customer: {
                name: '',
                phone: '',
            },
            stone: {
                color: {value: '', label: ''},
                type: {value: '', label: ''},
                form: {value: '', label: ''},
            },
            extra: {
                stella: '',
                stand: '',
                tombstone: '',
                plate: '',
                vase: '',
                adds: '',
            },
            info: {
                firstName: '',
                secondName: '',
                lastName: '',
                date: '',
                epitaph: '',
                portrait: '',
                text: '',
                adds: '',
            },
            info2: {
                firstName: '',
                secondName: '',
                lastName: '',
                date: '',
                epitaph: '',
                portrait: '',
                text: '',
                adds: '',
            },
            cemetery: {},
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
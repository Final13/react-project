export default {

    settings() {
        return {
            defaultPrices : {
                monument: '',
                vase: ''
            },
            portraitPrice: '',
            textPrice: '',
            sizeCoefficient : {
                eightyFortyFive: {
                    value: 1,
                    label: '80x40x5',
                    stand: '50x10x15',
                    flowerGarden: '100x50x8x5'
                },
                hundredFiftyFive: {
                    value: 1.2,
                    label: '100x50x5',
                    stand: '60x20x15',
                    flowerGarden: '100x60x10x5'
                },
                hundredFiftyEight: {
                    value: 1.4,
                    label: '100x50x8',
                    stand: '60x20x15',
                    flowerGarden: '100x60x10x8'
                },
                hundredTenSixtyEight: {
                    value: 1.6,
                    label: '110x60x8',
                    stand: '70x20x15',
                    flowerGarden: '120x70x10x5'
                },
                hundredTwentySixtyEight: {
                    value: 1.8,
                    label: '120x60x8',
                    stand: '70x20x15',
                    flowerGarden: '120x70x10x8'
                },
            },
            materialCoefficient : {
                black: {
                    value: 1,
                    label: '"Карельский" - чёрный гранит',
                    href: 'black-granite.png',
                },
                red: {
                    value: 1.8,
                    label: '"Балтик-Рэд" - красный гранит',
                    href: 'red-granite.png',
                },
                white: {
                    value: 1.5,
                    label: '"Мансуровский" - белый гранит',
                    href: 'white-granite.png',
                },
                gray: {
                    value: 1.5,
                    label: '"Куру-Грей" - серый гранит',
                    href: 'gray-granite.png',
                }
            }
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
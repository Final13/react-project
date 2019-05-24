const Settings = require('../models/Settings');

module.exports = () => {
    Settings.find({}).exec((err, collection) => {
        if (collection.length === 0) {
            Settings.create({
                rate: 0,
                rateGrowth: 0,
                defaultPrices: {
                    monument: 200,
                    vase: 50
                },
                portraitPrice: 60,
                textPrice: 40,
                sizeCoefficient : [
                    {
                        value: 1,
                        label: '80x40x5',
                        stand: '50x10x15',
                        flowerGarden: '100x50x8x5'
                    },
                    {
                        value: 1.2,
                        label: '100x50x5',
                        stand: '60x20x15',
                        flowerGarden: '100x60x10x5'
                    },
                    {
                        value: 1.4,
                        label: '100x50x8',
                        stand: '60x20x15',
                        flowerGarden: '100x60x10x8'
                    },
                    {
                        value: 1.6,
                        label: '110x60x8',
                        stand: '70x20x15',
                        flowerGarden: '120x70x10x5'
                    },
                    {
                        value: 1.8,
                        label: '120x60x8',
                        stand: '70x20x15',
                        flowerGarden: '120x70x10x8'
                    },
                ],
                materialCoefficient : [
                    {
                        value: 1,
                        label: '"Карельский" - чёрный гранит',
                        href: 'black-granite.png'
                    },
                    {
                        value: 1.8,
                        label: '"Балтик-Рэд" - красный гранит',
                        href: 'red-granite.png'
                    },
                    {
                        value: 1.5,
                        label: '"Мансуровский" - белый гранит',
                        href: 'white-granite.png'
                    },
                    {
                        value: 1.6,
                        label: '"Куру-Грей" - серый гранит',
                        href: 'gray-granite.png'
                    }
                ]
            });
        }
    });
};

export default {

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
            payments: [],
            total: 0,
            install: '',
            deleted: false
        }
    }
}
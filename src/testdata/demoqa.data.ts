// src/testdata/demoqa.data.ts
export const DemoQAData = {
    users: {
        standard: {
            name: 'Pradip Baskota',
            email: 'pradip@test.com'
        },
        empty: {
            name: '',
            email: ''
        },
        incorrect: {
            name: '',
            email: 'pradip@test'
        }
    },
    forms: {
        validFirstName: 'Pradip',
        invalidFirstName: '123',
        validPhone: '1234567890',
        invalidPhone: '',
        validLastName: "Test",
        gender: 'Male'

    }
};
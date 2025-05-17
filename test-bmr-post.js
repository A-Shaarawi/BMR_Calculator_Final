const fetch = require('node-fetch');

async function createUser() {
    try {
        const response = await fetch('http://localhost:5001/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'Shaarawi',
                email: 'shaarawi@example.com',
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('User created:', data);
        return data.user.id;
    } catch (err) {
        console.error('Error creating user:', err);
        return null;
    }
}

async function postBMR(userId) {
    try {
        const response = await fetch('http://localhost:5001/api/bmr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                username: 'Shaarawi',
                weight: 70,
                age: 25,
                height: 175,
                days: '3-4',
                gender: 'male',
                bmr: 1700,
                dailyCalories: 2200
            })
        });
        const data = await response.json();
        console.log('BMR Response:', data);
    } catch (err) {
        console.error('Error posting BMR:', err);
    }
}

async function main() {
    const userId = await createUser();
    if (userId) {
        await postBMR(userId);
    }
}

main(); 
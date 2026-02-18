const axios = require('axios');

const testSignup = async () => {
    try {
        const uniqueEmail = `testuser${Date.now()}@test.com`;
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Role',
            email: uniqueEmail,
            password: 'password123',
            phone: '1234567890',
            // Try to sneak in admin role
            role: 'admin',
            adminSecret: 'sharma-cars-admin-2024'
        });

        console.log('Signup Response:', res.status);
        console.log('Assigned Role:', res.data.user.role);

        if (res.data.user.role === 'user') {
            console.log('✅ TEST PASSED: Role is strictly "user".');
        } else {
            console.log('❌ TEST FAILED: Role is NOT "user".');
        }
    } catch (err) {
        console.error('Signup Failed:', err.response?.data || err.message);
    }
};

testSignup();

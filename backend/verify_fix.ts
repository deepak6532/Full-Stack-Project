
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/register';

const testDefaultUser = {
    name: 'Default User',
    email: `default${Date.now()}@example.com`,
    password: 'password123',
    phone: '9876543210'
};

const testAdminUser = {
    name: 'Admin User',
    email: `admin${Date.now()}@example.com`,
    password: 'password123',
    phone: '9876543210',
    role: 'admin'
};

async function verifyRoles() {
    try {
        console.log('1. Testing Default Registration (should be "user")...');
        const resUser = await axios.post(API_URL, testDefaultUser);
        if (resUser.data.user.role === 'user') {
            console.log('✅ PASS: Default role is "user".');
        } else {
            console.error('❌ FAIL: Default role is NOT "user"!');
        }

        console.log('\n2. Testing Admin Registration (should be "admin")...');
        const resAdmin = await axios.post(API_URL, testAdminUser);
        if (resAdmin.data.user.role === 'admin') {
            console.log('✅ PASS: Explicit role "admin" is accepted.');
        } else {
            console.error('❌ FAIL: Explicit role "admin" was NOT accepted!');
        }

    } catch (error: any) {
        console.error('Error:', error.response?.data?.message || error.message);
    }
}

verifyRoles();

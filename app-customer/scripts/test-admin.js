#!/usr/bin/env node

// Script untuk test admin functionality
const fs = require('fs');
const path = require('path');

// Load settings
const settings = require('../settings.json');

console.log('=== Test Admin Functionality ===\n');

// Test admin numbers
console.log('📋 Admin Configuration:');
console.log(`Admin numbers: ${JSON.stringify(settings.admins)}`);
console.log(`Technician numbers: ${JSON.stringify(settings.technician_numbers)}`);
console.log('');

// Test isAdminNumber function
function testIsAdminNumber(number) {
    try {
        const cleanNumber = number.replace(/\D/g, '');
        
        // Cek admin dari settings.json
        const adminNumbers = settings.admins || [];
        for (const adminNumber of adminNumbers) {
            const cleanAdminNumber = adminNumber.replace(/\D/g, '');
            if (cleanNumber === cleanAdminNumber) {
                return true;
            }
        }
        
        // Cek technician numbers dari settings.json
        const technicianNumbers = settings.technician_numbers || [];
        for (const techNumber of technicianNumbers) {
            const cleanTechNumber = techNumber.replace(/\D/g, '');
            if (cleanNumber === cleanTechNumber) {
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Error in testIsAdminNumber:', error);
        return false;
    }
}

// Test beberapa nomor
const testNumbers = [
    '082258536288',
    '08174900866' // Nomor test yang bukan admin
];

console.log('🔍 Testing Admin Number Validation:');
for (const number of testNumbers) {
    const isAdmin = testIsAdminNumber(number);
    console.log(`${number}: ${isAdmin ? '✅ Admin' : '❌ Not Admin'}`);
}
console.log('');

// Test message
const testMessage = `🧪 *TEST ADMIN SYSTEM*\n\n` +
    `📡 *STATUS:* ONLINE\n` +
    `📅 *TIME:* ${new Date().toLocaleString()}\n\n` +
    `🔧 *VALIDATION RESULT:*\n` +
    `• isAdminNumber: OK\n` +
    `• Admin Access: VERIFIED\n` +
    `• Bot System: READY\n\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `🏢 *GENIEACS INET CUSTOM*\n` +
    `👨‍💻 by Reza Habibie`;

console.log('📝 Test message yang akan dikirim:');
console.log(testMessage);
console.log('');

// Cek file superadmin.txt
try {
    const superAdminPath = path.join(__dirname, '../config/superadmin.txt');
    if (fs.existsSync(superAdminPath)) {
        const superAdmin = fs.readFileSync(superAdminPath, 'utf8').trim();
        console.log(`👑 Super admin: ${superAdmin}`);
    } else {
        console.log('❌ File superadmin.txt tidak ditemukan');
    }
} catch (error) {
    console.log('❌ Error reading superadmin.txt:', error.message);
}

console.log('');
console.log('✅ Script test admin selesai.');
console.log('💡 Tips: Jalankan aplikasi dengan "node scripts/restart-on-error.js"');
console.log('📱 Test dengan mengirim pesan "menu" atau "admin" ke bot WhatsApp'); 
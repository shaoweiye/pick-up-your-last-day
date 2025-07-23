# 📅 Pick the Right Last Day

A smart web tool that helps you calculate the optimal resignation timing to maximize your benefits when leaving your job. Currently supports Hong Kong employment law with plans to expand to other countries.

## 🎯 What It Does

This tool analyzes your employment situation and suggests the best resignation strategy by considering:

- **Annual leave entitlement** and usage
- **Notice period requirements** (calendar days vs working days)
- **Leave policies** (payout vs. use-it-or-lose-it)
- **Salary payment cycles**
- **Hong Kong public holidays** and business days
- **Month-end timing** for salary optimization

## 🌍 Supported Countries

- 🇭🇰 **Hong Kong** (Hong Kong Employment Ordinance)
- More countries coming soon...

## 🚀 Features

- **Smart Scenarios**: Compares multiple resignation strategies with pros/cons
- **Leave Optimization**: Maximizes annual leave benefits
- **Business Day Calculations**: Accounts for weekends and public holidays
- **Calendar View**: Visual timeline showing key dates
- **Decimal AL Support**: Handles fractional annual leave days (e.g., 8.7 days)
- **YYYY-MM-DD Date Format**: Clear, consistent date display
- **Mobile Responsive**: Works perfectly on all devices
- **No Registration**: Free to use, no sign-up required
- **Privacy First**: All calculations happen in your browser

## 💻 How to Use

1. **Select your country** (currently Hong Kong only)
2. **Enter your notice period** with calculation method:
   - Calendar days (includes weekends/holidays)
   - Working days (excludes weekends/holidays)
3. **Input annual leave details**:
   - Total annual leave entitlement
   - Days remaining as of resignation date
   - Leave year start date
   - Company leave policy
4. **Set timing preferences**:
   - Desired resignation date
   - Salary payment cycle
5. **Click "Calculate"** to see your optimal strategy with calendar view

## 🏗️ Project Structure

```
pick-last-day/
├── index.html          # Main website structure
├── styles.css          # Modern, responsive styling
├── script.js           # Hong Kong employment law calculations
└── README.md           # This file
```

## 🌐 Running Locally

### Option 1: Simple HTTP Server (Recommended)

```bash
# Navigate to the project directory
cd pick-last-day

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have it)
npx serve .
```

Then open: `http://localhost:8000`

### Option 2: Direct File Access

Simply double-click `index.html` in your file browser. The website will open in your default browser.


## 🔧 Technical Details

### Hong Kong Employment Law Implementation

The calculator implements key aspects of the Hong Kong Employment Ordinance with **official government data**:

- **Notice Period**: Calculated in business days or calendar days based on contract
- **Annual Leave**: Pro-rata calculation based on leave year  
- **Public Holidays**: **Official Hong Kong holidays from [Hong Kong Government](https://www.gov.hk/en/about/abouthk/holiday/)**
  - Source: General Holidays Ordinance (Cap. 149)
  - Covers 2024-2025 with accurate government-published dates
  - Includes all 17 annual general holidays
- **Leave Policies**: Handles payout, forfeit, and partial policies
- **Salary Cycles**: Optimizes timing for monthly/bi-weekly/weekly pay
- **Smart Last Days**: Ensures last working day is never weekend/holiday

#### **Data Accuracy & Sources**
- ✅ **Government Verified**: All public holidays sourced directly from official Hong Kong Government website
- ✅ **Legal Compliance**: Based on General Holidays Ordinance (Cap. 149)
- ✅ **Up-to-Date**: Regularly updated from official sources
- ⚠️ **Disclaimer**: Always verify with current government sources as holidays may change

### Browser Compatibility

- ✅ Chrome/Safari/Firefox (latest versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ No server required - pure client-side

## 📋 Example Use Cases

### Scenario 1: Maximizing Leave Payout
- **Situation**: 8.7 unused leave days, payout policy
- **Strategy**: Time resignation for maximum leave compensation

### Scenario 2: Month-End Optimization
- **Situation**: Monthly salary, mid-month resignation
- **Strategy**: Adjust timing to secure full month's pay

### Scenario 3: Use-It-or-Lose-It
- **Situation**: 15.5 unused days, no payout policy
- **Strategy**: Use leave during notice period

## ⚠️ Legal Disclaimer

This tool provides guidance based on general employment practices and publicly available information about employment laws. **Always consult with HR professionals or legal experts** for your specific situation, as:

- Employment contracts may have special clauses
- Company policies may differ from statutory minimums
- Laws change over time
- Individual circumstances vary

## 🔮 Future Plans

- **More countries with official data sources**:
  - 🇸🇬 **Singapore**: [Ministry of Manpower](https://www.mom.gov.sg/employment-practices/public-holidays)
  - 🇬🇧 **United Kingdom**: [UK Government](https://www.gov.uk/bank-holidays)
  - 🇦🇺 **Australia**: [Fair Work Australia](https://www.fairwork.gov.au/about-us/policies-and-guides/public-holidays)
  - 🇨🇦 **Canada**: [Government of Canada](https://www.canada.ca/en/revenue-agency/services/tax/public-holidays.html)
- **Enhanced calendar**: Full interactive calendar with month views
- **Contract analysis**: Upload contract for custom rules
- **Auto-updating holidays**: Direct API integration with government sources
- **Email reminders**: Notify about optimal timing
- **Multi-language support**

---

**Built with ❤️ to help people make better career transitions** 

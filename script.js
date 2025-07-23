// Employment law calculator with official government holiday data
// Framework designed to be extensible for multiple countries
class HongKongEmploymentCalculator {
    constructor() {
        // Hong Kong Public Holidays - Official Source: Hong Kong Government
        // Source: https://www.gov.hk/en/about/abouthk/holiday/
        // Reference: General Holidays Ordinance (Cap. 149)
        // Last Updated: July 2025 - Please verify with official government sources
        this.publicHolidays = [
            // 2024 - Hong Kong General Holidays
            '2024-01-01', // New Year's Day
            '2024-02-10', // Lunar New Year's Day
            '2024-02-12', // The second day of Lunar New Year
            '2024-02-13', // The third day of Lunar New Year  
            '2024-03-29', // Good Friday
            '2024-03-30', // The day following Good Friday
            '2024-04-01', // Easter Monday
            '2024-04-04', // Ching Ming Festival
            '2024-05-01', // Labour Day
            '2024-05-15', // Buddha's Birthday
            '2024-06-10', // Dragon Boat Festival
            '2024-07-01', // Hong Kong Special Administrative Region Establishment Day
            '2024-09-18', // The day following the Chinese Mid-Autumn Festival
            '2024-10-01', // National Day
            '2024-10-11', // Chung Yeung Festival
            '2024-12-25', // Christmas Day
            '2024-12-26', // The first weekday after Christmas Day
            
            // 2025 - Hong Kong General Holidays (Official dates from HK Government)
            '2025-01-01', // New Year's Day
            '2025-01-29', // Lunar New Year's Day
            '2025-01-30', // The second day of Lunar New Year
            '2025-01-31', // The third day of Lunar New Year
            '2025-04-04', // Ching Ming Festival  
            '2025-04-18', // Good Friday
            '2025-04-19', // The day following Good Friday
            '2025-04-21', // Easter Monday
            '2025-05-01', // Labour Day
            '2025-05-05', // Buddha's Birthday
            '2025-05-31', // Dragon Boat Festival
            '2025-07-01', // Hong Kong Special Administrative Region Establishment Day
            '2025-10-01', // National Day
            '2025-10-06', // The day following the Chinese Mid-Autumn Festival
            '2025-10-29', // Chung Yeung Festival
            '2025-12-25', // Christmas Day
            '2025-12-26'  // The first weekday after Christmas Day
        ];
        
        // TO EXTEND FOR OTHER COUNTRIES:
        // Create similar arrays sourced from official government websites:
        // - Singapore: https://www.mom.gov.sg/employment-practices/public-holidays
        // - UK: https://www.gov.uk/bank-holidays  
        // - Australia: https://www.fairwork.gov.au/about-us/policies-and-guides/public-holidays
        // - Canada: https://www.canada.ca/en/revenue-agency/services/tax/public-holidays.html
        // Each country should have its own calculator class with official holiday data
    }

    // Get information about holiday data sources for transparency
    getHolidayDataSource() {
        return {
            country: "Hong Kong",
            officialSource: "Hong Kong Government",
            sourceUrl: "https://www.gov.hk/en/about/abouthk/holiday/",
            legalReference: "General Holidays Ordinance (Cap. 149)",
            lastUpdated: "July 2025",
            note: "Please verify current dates with official government sources as holidays may change"
        };
    }

    // Helper method to format AL days nicely (handles decimals)
    formatALDays(days) {
        if (days === 0) return "0";
        if (days % 1 === 0) return days.toString(); // Whole number
        return days.toFixed(1); // One decimal place
    }

    // Helper method to format dates as YYYY-MM-DD (timezone-safe)
    formatDate(date) {
        if (!date || isNaN(date.getTime())) return 'Invalid Date';
        
        // Use local timezone instead of UTC to avoid date shifting
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }

    // Helper method to parse dates safely
    parseDate(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
    }

    // Check if a date is a business day (not weekend or public holiday)
    isBusinessDay(date) {
        const dayOfWeek = date.getDay();
        const dateString = this.formatDate(date); // Use consistent date formatting
        return dayOfWeek !== 0 && dayOfWeek !== 6 && !this.publicHolidays.includes(dateString);
    }

    // Enhanced calendar view generation
    generateCalendarView(scenario) {
        const startDate = new Date(Math.min(new Date(scenario.resignationDate), new Date(scenario.lastWorkingDay)));
        const endDate = new Date(Math.max(new Date(scenario.contractEndDate), new Date(scenario.lastWorkingDay)));
        
        // Get the month range to display
        const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const monthEnd = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
        
        // Create calendar HTML
        let calendarHTML = '<div class="calendar-container">';
        
        let currentMonth = new Date(monthStart);
        while (currentMonth <= monthEnd) {
            calendarHTML += this.generateMonthCalendar(currentMonth, scenario);
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        
        calendarHTML += '</div>';
        return calendarHTML;
    }

    // Generate calendar view for a scenario
    generateCalendarView(scenario) {
        const startDate = new Date(Math.min(new Date(scenario.resignationDate), new Date(scenario.lastWorkingDay)));
        const endDate = new Date(Math.max(new Date(scenario.contractEndDate), new Date(scenario.lastWorkingDay)));
        
        // Get the month range to display
        const monthStart = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const monthEnd = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
        
        // Create calendar HTML
        let calendarHTML = '<div class="calendar-container">';
        
        let currentMonth = new Date(monthStart);
        while (currentMonth <= monthEnd) {
            calendarHTML += this.generateMonthCalendar(currentMonth, scenario);
            currentMonth.setMonth(currentMonth.getMonth() + 1);
        }
        
        calendarHTML += '</div>';
        return calendarHTML;
    }

    // Generate a single month calendar
    generateMonthCalendar(monthDate, scenario) {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();
        const monthName = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDayOfWeek = firstDay.getDay();
        
        let html = `
            <div class="month-calendar">
                <h4 class="month-title">${monthName}</h4>
                <div class="calendar-grid">
                    <div class="day-header">Sun</div>
                    <div class="day-header">Mon</div>
                    <div class="day-header">Tue</div>
                    <div class="day-header">Wed</div>
                    <div class="day-header">Thu</div>
                    <div class="day-header">Fri</div>
                    <div class="day-header">Sat</div>
        `;
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="day-cell empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(year, month, day);
            const dateString = this.formatDate(currentDate);
            
            let cellClass = 'day-cell';
            let cellContent = day.toString();
            let indicators = [];
            
            // Check for special dates
            if (dateString === this.formatDate(new Date(scenario.resignationDate))) {
                cellClass += ' resignation-date';
                indicators.push('<span class="indicator resignation">R</span>');
            }
            
            if (dateString === this.formatDate(new Date(scenario.lastWorkingDay))) {
                cellClass += ' last-working-day';
                indicators.push('<span class="indicator last-work">L</span>');
            }
            
            if (dateString === this.formatDate(new Date(scenario.contractEndDate))) {
                if (dateString !== this.formatDate(new Date(scenario.lastWorkingDay))) {
                    cellClass += ' contract-end-date';
                    indicators.push('<span class="indicator contract-end">E</span>');
                }
            }
            
            // Check for AL usage - smart detection based on strategy
            if (scenario.alUsedDuringNotice > 0 && this.isALDay(currentDate, scenario)) {
                cellClass += ' al-day';
                indicators.push('<span class="indicator al">AL</span>');
            }
            
            // Check for weekends
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                cellClass += ' weekend';
            }
            
            // Check for public holidays
            if (this.publicHolidays.includes(dateString)) {
                cellClass += ' public-holiday';
                indicators.push('<span class="indicator holiday">H</span>');
            }
            
            html += `
                <div class="${cellClass}" title="${this.getDateTooltip(currentDate, scenario)}">
                    <div class="day-number">${cellContent}</div>
                    <div class="indicators">${indicators.join('')}</div>
                </div>
            `;
        }
        
        html += '</div></div>';
        return html;
    }

    // Determine if a specific date is an AL day based on the strategy
    isALDay(date, scenario) {
        const resignationDate = new Date(scenario.resignationDate);
        const lastWorkingDay = new Date(scenario.lastWorkingDay);
        const contractEndDate = new Date(scenario.contractEndDate);
        
        if (scenario.category === 'standard') {
            // Standard: No AL used during notice - all paid out as cash
            return false;
        } else if (scenario.category === 'earliest') {
            // Earliest Last Day: AL replaces working days at the END of notice period
            // Show AL days for working days that were replaced (after new last working day)
            
            // We need to find the "standard" last working day to compare
            // Count working days from resignation to see which ones are replaced
            const workingDaysFromResignation = [];
            let checkDate = new Date(resignationDate);
            checkDate.setDate(checkDate.getDate() + 1); // Start day after resignation
            
            // Collect all working days in what would be the full notice period
            const maxDate = new Date(resignationDate);
            maxDate.setDate(maxDate.getDate() + 70); // Reasonable max notice period
            
            while (checkDate <= maxDate && workingDaysFromResignation.length < 50) { // Reasonable limits
                if (this.isBusinessDay(checkDate)) {
                    workingDaysFromResignation.push(new Date(checkDate));
                }
                checkDate.setDate(checkDate.getDate() + 1);
            }
            
            // Find where this date falls in the working day sequence
            const dateWorkingDayIndex = workingDaysFromResignation.findIndex(
                wd => wd.toDateString() === date.toDateString()
            );
            
            if (dateWorkingDayIndex === -1) return false; // Not a working day
            
            // AL replaces working days at the end - figure out which days are replaced
            const lastWorkingDayIndex = workingDaysFromResignation.findIndex(
                wd => wd.toDateString() === lastWorkingDay.toDateString()
            );
            
            // If this working day comes after the new last working day, it's replaced by AL
            return dateWorkingDayIndex > lastWorkingDayIndex;
            
        } else if (scenario.category === 'balanced') {
            // Smart Balanced: AL is used AFTER last working day for time off
            if (date <= lastWorkingDay || date > contractEndDate) return false;
            
            // This date must be a working day to be marked as AL (never use AL on holidays/weekends)
            if (!this.isBusinessDay(date)) return false;
            
            // Count only working days from day after last working day up to (but not including) this date
            let workingDaysUsedSoFar = 0;
            let checkDate = new Date(lastWorkingDay);
            checkDate.setDate(checkDate.getDate() + 1); // Start day after last working day
            
            while (checkDate < date) { // Use < not <= to count days before this date
                if (this.isBusinessDay(checkDate)) {
                    workingDaysUsedSoFar++;
                }
                checkDate.setDate(checkDate.getDate() + 1);
            }
            
            // This working day is AL if we haven't used up our AL allocation yet
            return workingDaysUsedSoFar < scenario.alUsedDuringNotice;
        }
        
        return false;
    }

    // Get tooltip text for a date
    getDateTooltip(date, scenario) {
        const dateString = this.formatDate(date);
        let tooltip = dateString;
        
        if (dateString === this.formatDate(new Date(scenario.resignationDate))) {
            tooltip += ' - Resignation Date';
        }
        if (dateString === this.formatDate(new Date(scenario.lastWorkingDay))) {
            tooltip += ' - Last Working Day';
        }
        if (dateString === this.formatDate(new Date(scenario.contractEndDate))) {
            tooltip += ' - Contract End Date';
        }
        if (this.publicHolidays.includes(dateString)) {
            tooltip += ' - Public Holiday';
        }
        
        // Add AL information based on strategy
        if (scenario.alUsedDuringNotice > 0 && this.isALDay(date, scenario)) {
            if (scenario.category === 'earliest') {
                tooltip += ' - AL Day (Working day replaced to finish earlier)';
            } else if (scenario.category === 'balanced') {
                tooltip += ' - AL Day (Time off after notice period)';
            }
        }
        
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            tooltip += ' - Weekend';
        }
        
        return tooltip;
    }

    // Convert notice period to days (handles both days and months, calendar vs working days)
    convertNoticePeriodToDays(value, unit, periodType, resignationDate) {
        let totalDays;
        
        if (unit === 'days') {
            totalDays = value;
        } else if (unit === 'months') {
            // For months, calculate the actual calendar months and convert to days
            const startDate = new Date(resignationDate);
            const endDate = new Date(resignationDate);
            endDate.setMonth(endDate.getMonth() + value);
            
            // Calculate the actual calendar days difference
            const timeDiff = endDate.getTime() - startDate.getTime();
            totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        } else {
            totalDays = value; // fallback
        }
        
        // If the contract specifies working days, we need to convert
        // Note: totalDays is now the raw number we need to interpret
        if (periodType === 'working' && unit === 'days') {
            // Input is already in working days, return as-is
            return totalDays;
        } else if (periodType === 'calendar' && unit === 'days') {
            // Input is calendar days, return as-is for calendar calculation
            return totalDays;
        } else {
            // For months, always treat as calendar months first
            return totalDays;
        }
    }

    // Calculate business days between two dates
    calculateBusinessDays(startDate, endDate) {
        let count = 0;
        let current = new Date(startDate);
        
        while (current <= endDate) {
            const dayOfWeek = current.getDay();
            const dateString = current.toISOString().split('T')[0];
            
            // Check if it's not weekend and not public holiday
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.publicHolidays.includes(dateString)) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    }

    // Add business days to a date
    addBusinessDays(startDate, businessDays) {
        let current = new Date(startDate);
        let added = 0;
        
        while (added < businessDays) {
            current.setDate(current.getDate() + 1);
            const dayOfWeek = current.getDay();
            const dateString = current.toISOString().split('T')[0];
            
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.publicHolidays.includes(dateString)) {
                added++;
            }
        }
        
        // Ensure the final day is actually a business day
        while (true) {
            const dayOfWeek = current.getDay();
            const dateString = current.toISOString().split('T')[0];
            
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.publicHolidays.includes(dateString)) {
                break; // It's a valid business day
            }
            current.setDate(current.getDate() + 1); // Move to next day
        }
        
        return current;
    }

    // Subtract business days from a date
    subtractBusinessDays(startDate, businessDays) {
        let current = new Date(startDate);
        let subtracted = 0;
        
        while (subtracted < businessDays) {
            current.setDate(current.getDate() - 1);
            const dayOfWeek = current.getDay();
            const dateString = current.toISOString().split('T')[0];
            
            if (dayOfWeek !== 0 && dayOfWeek !== 6 && !this.publicHolidays.includes(dateString)) {
                subtracted++;
            }
        }
        
        // Ensure we end on a business day
        while (!this.isBusinessDay(current)) {
            current.setDate(current.getDate() - 1);
        }
        
        return current;
    }

    // Calculate prorated annual leave entitlement
    calculateProratedLeave(totalAnnualLeave, leaveYearStart, calculationDate) {
        const leaveYearEnd = new Date(leaveYearStart);
        leaveYearEnd.setFullYear(leaveYearEnd.getFullYear() + 1);
        
        const totalDaysInYear = Math.ceil((leaveYearEnd - leaveYearStart) / (1000 * 60 * 60 * 24));
        const daysElapsed = Math.ceil((calculationDate - leaveYearStart) / (1000 * 60 * 60 * 24));
        
        return Math.floor((daysElapsed / totalDaysInYear) * totalAnnualLeave);
    }

    // Calculate additional AL that will accrue during notice period
    calculateAdditionalALDuringNotice(totalAnnualLeave, leaveYearStart, resignationDate, lastWorkingDay) {
        const alAtResignation = this.calculateProratedLeave(totalAnnualLeave, leaveYearStart, resignationDate);
        const alAtLastDay = this.calculateProratedLeave(totalAnnualLeave, leaveYearStart, lastWorkingDay);
        
        return Math.max(0, alAtLastDay - alAtResignation);
    }

    // Add calendar days to a date (including weekends and holidays)
    addCalendarDays(startDate, days) {
        const result = new Date(startDate);
        result.setDate(result.getDate() + days);
        return result;
    }

    // Find optimal last working day
    calculateOptimalResignation(data) {
        // Parse dates properly and add validation
        const resignationDate = this.parseDate(data['desired-resignation-date']);
        const noticePeriodValue = parseInt(data['notice-period']);
        const noticePeriodUnit = data['notice-period-unit'];
        const leaveYearStart = this.parseDate(data['leave-year-start']);
        const totalAnnualLeave = parseInt(data['annual-leave-total']);
        const remainingLeaveAtResignation = parseFloat(data['annual-leave-remaining']); // Allow decimals
        const leavePolicy = data['leave-policy'];
        const salaryCycle = data['salary-cycle'];
        const noticePeriodType = data['notice-period-type']; // calendar or working days

        // Convert notice period to days if specified in months
        const noticePeriodDays = this.convertNoticePeriodToDays(noticePeriodValue, noticePeriodUnit, noticePeriodType, resignationDate);

        // Validate required data
        if (!resignationDate || isNaN(noticePeriodValue) || !leaveYearStart || isNaN(totalAnnualLeave) || isNaN(remainingLeaveAtResignation) || !noticePeriodType) {
            throw new Error('Invalid input data. Please check all fields are filled correctly.');
        }

        // Calculate standard last day based on notice period type
        let standardLastDay;
        if (noticePeriodType === 'working') {
            // For working days, use business day calculation (already ensures business day)
            standardLastDay = this.addBusinessDays(resignationDate, noticePeriodDays);
        } else {
            // For calendar days, add calendar days then adjust to previous business day if needed
            standardLastDay = this.addCalendarDays(resignationDate, noticePeriodDays);
            
            // Ensure the last working day is actually a business day
            while (!this.isBusinessDay(standardLastDay)) {
                standardLastDay.setDate(standardLastDay.getDate() - 1);
            }
        }
        
        // Calculate AL accrual during notice period
        const additionalALDuringNotice = this.calculateAdditionalALDuringNotice(
            totalAnnualLeave, leaveYearStart, resignationDate, standardLastDay
        );
        
        const totalALByLastDay = remainingLeaveAtResignation + additionalALDuringNotice;
        
        // Generate optimization scenarios
        const scenarios = this.generateScenarios(
            resignationDate, 
            standardLastDay, 
            remainingLeaveAtResignation,
            totalALByLastDay,
            additionalALDuringNotice,
            leavePolicy, 
            salaryCycle, 
            noticePeriodDays, 
            noticePeriodValue, 
            noticePeriodUnit,
            noticePeriodType
        );
        
        // Find the best scenario
        const optimalScenario = this.findOptimalScenario(scenarios);
        
        return {
            standardLastDay,
            optimalScenario,
            scenarios,
            remainingLeaveAtResignation,
            totalALByLastDay,
            additionalALDuringNotice,
            analysis: this.generateAnalysis(data, optimalScenario, totalALByLastDay)
        };
    }

    generateScenarios(resignationDate, standardLastDay, remainingLeaveAtResignation, totalALByLastDay, additionalALDuringNotice, leavePolicy, salaryCycle, noticePeriodDays, noticePeriodValue, noticePeriodUnit, noticePeriodType) {
        const scenarios = [];
        const noticePeriodDescription = noticePeriodUnit === 'months' ? 
            `${noticePeriodValue} month${noticePeriodValue > 1 ? 's' : ''}` : 
            `${noticePeriodDays} ${noticePeriodType} days`;

        // Scenario 1: Standard Resignation - Work full notice, get all AL paid out
        const workingDaysInNotice = noticePeriodType === 'working' ? 
            noticePeriodDays : // For working days, notice period IS the working days
            this.calculateBusinessDays(resignationDate, standardLastDay); // For calendar days, calculate actual working days
        // Standard Resignation: No AL used during notice, all AL gets paid out
        // (Policy affects recommendation, but not the math - all AL should be accounted for)
        scenarios.push({
            name: "💼 Standard Resignation",
            category: "standard",
            resignationDate: resignationDate,
            lastWorkingDay: standardLastDay,
            contractEndDate: standardLastDay,
            alRemainingByLastDay: totalALByLastDay,
            alUsedDuringNotice: 0, // Don't use AL during notice period
            alPaidOut: totalALByLastDay, // Pay out ALL remaining AL
            workingDaysInNotice: workingDaysInNotice,
            totalSalaryDays: workingDaysInNotice + totalALByLastDay,
            description: `Work full ${noticePeriodDescription} notice period, get all ${this.formatALDays(totalALByLastDay)} AL days paid out as cash`,
            pros: [
                "✅ Fulfills notice requirements professionally",
                `💰 Maximum cash compensation (${this.formatALDays(totalALByLastDay)} days)`,
                "🤝 Maintains good relationship with employer",
                "💵 All AL converted to cash - no AL wasted"
            ],
            cons: [
                `⏰ Maximum working days (${workingDaysInNotice} days)`,
                "🚫 No time off during notice period", 
                "📅 Latest possible finish date"
            ],
        });

        // Strategy 2: Earliest Last Day - Use AL to finish work sooner (skip holidays!)
        if (totalALByLastDay > 0) {
            const earlyLastDayPlan = this.calculateEarliestLastDay(resignationDate, standardLastDay, totalALByLastDay, noticePeriodType);
            
            scenarios.push({
                name: "🚀 Earliest Last Day",
                category: "earliest",
                resignationDate: resignationDate,
                lastWorkingDay: earlyLastDayPlan.lastWorkingDay,
                contractEndDate: earlyLastDayPlan.lastWorkingDay,
                alRemainingByLastDay: totalALByLastDay,
                alUsedDuringNotice: earlyLastDayPlan.alUsed,
                alPaidOut: earlyLastDayPlan.alPaidOut,
                workingDaysInNotice: earlyLastDayPlan.actualWorkingDays,
                totalSalaryDays: earlyLastDayPlan.actualWorkingDays + earlyLastDayPlan.alUsed + earlyLastDayPlan.alPaidOut,
                description: `Use ${this.formatALDays(earlyLastDayPlan.alUsed)} AL days to replace working days at the end of notice period - finish work early on ${this.formatDate(earlyLastDayPlan.lastWorkingDay)}`,
                pros: [
                    "🏃‍♂️ Start new job sooner",
                    `⏰ Fewer working days (${earlyLastDayPlan.actualWorkingDays} vs ${earlyLastDayPlan.totalWorkingDaysInNotice})`,
                    `💰 Still get AL payout (${this.formatALDays(earlyLastDayPlan.alPaidOut)} days)`,
                    "🎯 Smart AL usage - skips holidays automatically",
                    "💡 Perfect for quick job transitions"
                ],
                cons: [
                    "🤝 May need employer approval",
                    "💸 Less total cash than standard approach",
                    "⚡ Shorter handover period"
                ]
            });
        }

        // Strategy 3: Smart Balanced Approach - Use some AL within notice period constraints
        if (totalALByLastDay > 0) {
            const balancedPlan = this.calculateBalancedApproach(resignationDate, standardLastDay, totalALByLastDay);
            
            scenarios.push({
                name: "⚖️ Smart Balanced",
                category: "balanced",
                resignationDate: resignationDate,
                lastWorkingDay: standardLastDay,
                contractEndDate: balancedPlan.contractEndDate,
                alRemainingByLastDay: totalALByLastDay,
                alUsedDuringNotice: balancedPlan.alUsed,
                alPaidOut: balancedPlan.alPaidOut,
                workingDaysInNotice: workingDaysInNotice,
                totalSalaryDays: workingDaysInNotice + balancedPlan.alUsed + balancedPlan.alPaidOut,
                description: `Work notice period, then use ${this.formatALDays(balancedPlan.alUsed)} AL days within contract period (smart holiday-aware timing)`,
                pros: [
                    "🎯 Balanced approach: work + time off + cash",
                    `🏖️ ${this.formatALDays(balancedPlan.alUsed)} days of time off`,
                    `💰 Still get AL payout (${this.formatALDays(balancedPlan.alPaidOut)} days)`,
                    "🚫 Never uses AL on public holidays",
                    "📋 Respects notice period constraints"
                ],
                cons: [
                    "🕐 Some extended commitment beyond notice",
                    "💸 Less cash than standard approach",
                    "📅 May delay new job start slightly"
                ]
            });
        }

        return scenarios;
    }

    // Smart AL usage calculation - connects AL with weekends and holidays
    calculateSmartALUsage(lastWorkingDay, totalALAvailable) {
        const maxALToUse = Math.min(totalALAvailable, Math.ceil(totalALAvailable * 0.7)); // Use up to 70%
        
        // Start checking from the day after last working day
        let startDate = new Date(lastWorkingDay);
        startDate.setDate(startDate.getDate() + 1);
        
        // Look for the best period to maximize consecutive days off
        let bestPlan = {
            daysToUse: Math.ceil(maxALToUse * 0.6), // Default to 60% if no smart opportunity
            endDate: this.addCalendarDays(lastWorkingDay, Math.ceil(maxALToUse * 0.6)),
            consecutiveDays: Math.ceil(maxALToUse * 0.6),
            strategy: "for a good break"
        };
        
        // Check next 4 weeks for weekend/holiday opportunities
        for (let checkWeeks = 0; checkWeeks < 4; checkWeeks++) {
            const checkDate = new Date(startDate);
            checkDate.setDate(checkDate.getDate() + (checkWeeks * 7));
            
            const weekPlan = this.findBestWeekForAL(checkDate, maxALToUse);
            if (weekPlan.consecutiveDays > bestPlan.consecutiveDays) {
                bestPlan = weekPlan;
            }
        }
        
        return bestPlan;
    }

    // Find the best week to use AL for maximum consecutive days (skip public holidays!)
    findBestWeekForAL(startDate, maxALDays) {
        let bestPlan = { daysToUse: 0, endDate: startDate, consecutiveDays: 0, strategy: "" };
        
        // Check Friday-Monday patterns (common 4-day weekend opportunities)
        const friday = this.getNextWeekday(startDate, 5); // Friday = 5
        const monday = this.getNextWeekday(friday, 1); // Following Monday = 1
        
        // Check 2-week period around this date for holidays
        const checkPeriod = [];
        for (let i = -7; i <= 14; i++) {
            const checkDay = new Date(friday);
            checkDay.setDate(checkDay.getDate() + i);
            checkPeriod.push({
                date: checkDay,
                isWeekend: checkDay.getDay() === 0 || checkDay.getDay() === 6,
                isHoliday: this.publicHolidays.includes(this.formatDate(checkDay)),
                isWorkingDay: checkDay.getDay() !== 0 && checkDay.getDay() !== 6 && !this.publicHolidays.includes(this.formatDate(checkDay))
            });
        }
        
        // Strategy 1: Long weekend extension (Friday or Monday)
        if (maxALDays >= 1) {
            const fridayInfo = checkPeriod.find(d => d.date.getDay() === 5);
            const mondayInfo = checkPeriod.find(d => d.date.getDay() === 1 && d.date > fridayInfo.date);
            
            // Try Friday extension (Thu work, Fri AL, Sat-Sun weekend)
            if (fridayInfo && fridayInfo.isWorkingDay) {
                const consecutiveDays = this.countConsecutiveOffDays(fridayInfo.date, checkPeriod, 1);
                if (consecutiveDays > bestPlan.consecutiveDays) {
                    bestPlan = {
                        daysToUse: 1, // Only 1 AL day needed since Friday is working day
                        endDate: this.addCalendarDays(fridayInfo.date, 3),
                        consecutiveDays: consecutiveDays,
                        strategy: "to extend weekend (take Friday off)"
                    };
                }
            }
            
            // Try Monday extension (Sat-Sun weekend, Mon AL, Tue work)
            if (mondayInfo && mondayInfo.isWorkingDay) {
                const consecutiveDays = this.countConsecutiveOffDays(new Date(mondayInfo.date.getTime() - 2*24*60*60*1000), checkPeriod, 1); // Start from Saturday
                if (consecutiveDays > bestPlan.consecutiveDays) {
                    bestPlan = {
                        daysToUse: 1, // Only 1 AL day needed since Monday is working day
                        endDate: this.addCalendarDays(mondayInfo.date, 1),
                        consecutiveDays: consecutiveDays,
                        strategy: "to extend weekend (take Monday off)"
                    };
                }
            }
        }
        
        // Strategy 2: Full week break (only use AL on working days)
        if (maxALDays >= 3) { // Need at least 3 AL days for a meaningful week break
            const weekStart = this.getNextWeekday(startDate, 1); // Find a Monday
            const workingDaysInWeek = [];
            
            // Check Monday to Friday of that week
            for (let i = 0; i < 5; i++) {
                const checkDay = new Date(weekStart);
                checkDay.setDate(checkDay.getDate() + i);
                const dayInfo = checkPeriod.find(d => d.date.getTime() === checkDay.getTime());
                if (dayInfo && dayInfo.isWorkingDay) {
                    workingDaysInWeek.push(dayInfo);
                }
            }
            
            // Only proceed if we have working days to replace with AL
            if (workingDaysInWeek.length > 0) {
                const alNeeded = Math.min(workingDaysInWeek.length, maxALDays);
                const totalOffDays = this.countConsecutiveOffDays(new Date(weekStart.getTime() - 2*24*60*60*1000), checkPeriod, alNeeded);
                
                if (totalOffDays > bestPlan.consecutiveDays) {
                    bestPlan = {
                        daysToUse: alNeeded,
                        endDate: this.addCalendarDays(weekStart, 6), // End of week
                        consecutiveDays: totalOffDays,
                        strategy: `for a full week break (${alNeeded} AL + weekends/holidays)`
                    };
                }
            }
        }
        
        // Strategy 3: Holiday bridge (connect holidays with weekends using minimal AL)
        const holidays = checkPeriod.filter(d => d.isHoliday);
        for (const holiday of holidays) {
            if (maxALDays >= 1) {
                // Find gaps between holiday and weekend that can be bridged
                const bridgeOpportunities = this.findBridgeOpportunities(holiday.date, checkPeriod, maxALDays);
                
                for (const bridge of bridgeOpportunities) {
                    if (bridge.consecutiveDays > bestPlan.consecutiveDays && bridge.alNeeded <= maxALDays) {
                        bestPlan = {
                            daysToUse: bridge.alNeeded,
                            endDate: bridge.endDate,
                            consecutiveDays: bridge.consecutiveDays,
                            strategy: `to bridge ${this.formatDate(holiday.date)} holiday with weekend`
                        };
                    }
                }
            }
        }
        
        return bestPlan;
    }

    // Count consecutive days off when using specified AL days
    countConsecutiveOffDays(startDate, periodInfo, alDaysToUse) {
        let consecutiveDays = 0;
        let alUsed = 0;
        let currentDate = new Date(startDate);
        
        // Count forward from start date
        for (let i = 0; i < 21; i++) { // Check up to 3 weeks
            const dayInfo = periodInfo.find(d => d.date.toDateString() === currentDate.toDateString());
            
            if (dayInfo) {
                if (dayInfo.isWeekend || dayInfo.isHoliday) {
                    consecutiveDays++; // Free day off
                } else if (dayInfo.isWorkingDay && alUsed < alDaysToUse) {
                    consecutiveDays++; // Use AL for this working day
                    alUsed++;
                } else {
                    break; // Hit a working day we can't cover with AL
                }
            } else {
                break; // Outside our check period
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return consecutiveDays;
    }

    // Find opportunities to bridge holidays with weekends
    findBridgeOpportunities(holidayDate, periodInfo, maxALDays) {
        const opportunities = [];
        
        // Check 7 days before and after the holiday
        for (let offset = -7; offset <= 7; offset++) {
            const checkDate = new Date(holidayDate);
            checkDate.setDate(checkDate.getDate() + offset);
            
            if (checkDate.getDay() === 0 || checkDate.getDay() === 6) { // It's a weekend
                // Calculate AL needed to bridge from weekend to holiday (or vice versa)
                const alNeeded = this.calculateBridgeAL(checkDate, holidayDate, periodInfo);
                
                if (alNeeded > 0 && alNeeded <= maxALDays) {
                    const consecutiveDays = this.countConsecutiveOffDays(
                        checkDate < holidayDate ? checkDate : holidayDate, 
                        periodInfo, 
                        alNeeded
                    );
                    
                    opportunities.push({
                        alNeeded: alNeeded,
                        consecutiveDays: consecutiveDays,
                        endDate: checkDate > holidayDate ? this.addCalendarDays(checkDate, 1) : this.addCalendarDays(holidayDate, 1)
                    });
                }
            }
        }
        
        return opportunities;
    }

    // Calculate AL days needed to bridge between two dates
    calculateBridgeAL(date1, date2, periodInfo) {
        const startDate = date1 < date2 ? date1 : date2;
        const endDate = date1 < date2 ? date2 : date1;
        
        let alNeeded = 0;
        let currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
            const dayInfo = periodInfo.find(d => d.date.toDateString() === currentDate.toDateString());
            if (dayInfo && dayInfo.isWorkingDay) {
                alNeeded++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return alNeeded;
    }

    // Get next occurrence of a specific weekday
    getNextWeekday(fromDate, targetDay) {
        const date = new Date(fromDate);
        const currentDay = date.getDay();
        const daysUntilTarget = (targetDay - currentDay + 7) % 7;
        
        if (daysUntilTarget === 0 && date.getTime() === fromDate.getTime()) {
            return date; // It's already the target day
        }
        
        date.setDate(date.getDate() + (daysUntilTarget === 0 ? 7 : daysUntilTarget));
        return date;
    }



    // Calculate earliest last day by using AL to replace working days at the END of notice period
    calculateEarliestLastDay(resignationDate, standardLastDay, totalALAvailable, noticePeriodType) {
        const maxALToUse = Math.min(totalALAvailable, Math.ceil(totalALAvailable * 0.6)); // Use up to 60%
        
        // Build list of all working days in notice period (excluding weekends and holidays)
        const workingDaysInNotice = [];
        let currentDate = new Date(resignationDate);
        currentDate.setDate(currentDate.getDate() + 1); // Start day after resignation
        
        while (currentDate <= standardLastDay) {
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            const isHoliday = this.publicHolidays.includes(this.formatDate(currentDate));
            
            if (!isWeekend && !isHoliday) {
                workingDaysInNotice.push(new Date(currentDate));
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Use AL to replace working days at the END (to finish earlier)
        const alToUse = Math.min(maxALToUse, workingDaysInNotice.length);
        const workingDaysToActuallyWork = workingDaysInNotice.length - alToUse;
        
        // New last working day is the last day we actually work (not replaced by AL)
        const newLastWorkingDay = workingDaysToActuallyWork > 0 ? 
            workingDaysInNotice[workingDaysToActuallyWork - 1] : 
            new Date(resignationDate); // If using all days as AL, resign immediately
        
        return {
            lastWorkingDay: newLastWorkingDay,
            alUsed: alToUse,
            alPaidOut: totalALAvailable - alToUse,
            actualWorkingDays: workingDaysToActuallyWork,
            totalWorkingDaysInNotice: workingDaysInNotice.length
        };
    }

    // Calculate balanced approach: use some AL for time off, but within reasonable constraints
    calculateBalancedApproach(resignationDate, standardLastDay, totalALAvailable) {
        // Use moderate amount of AL (around 40-50%) for time off
        const alForTimeOff = Math.min(totalALAvailable, Math.ceil(totalALAvailable * 0.5));
        const alForPayout = totalALAvailable - alForTimeOff;
        
        // Contract end date: start from day after standard last day and count only working days
        let contractEndDate = new Date(standardLastDay);
        let alWorkingDaysAdded = 0;
        
        // Add calendar days but only count working days toward AL usage (skip weekends/holidays)
        while (alWorkingDaysAdded < alForTimeOff) {
            contractEndDate.setDate(contractEndDate.getDate() + 1);
            
            // Only count working days toward AL allocation (excludes weekends and public holidays)
            if (this.isBusinessDay(contractEndDate)) {
                alWorkingDaysAdded++;
            }
        }
        
        return {
            contractEndDate: contractEndDate,
            alUsed: alForTimeOff,
            alPaidOut: alForPayout
        };
    }

    // Simple recommendation logic - Standard is default, but can be customized
    findOptimalScenario(scenarios) {
        // Default to first scenario (Standard Resignation) as it's most conservative
        // Could add smarter logic here based on user preferences later
        return scenarios[0];
    }

    generateAnalysis(data, optimalScenario, totalALByLastDay) {
        const analysis = [];
        
        analysis.push({
            type: 'info',
            title: 'Annual Leave Analysis',
            content: `You'll have ${this.formatALDays(totalALByLastDay)} AL days eligible by your last working day. This includes any AL that accrues during your notice period. Your leave policy (${data['leave-policy']}) determines how unused days are handled.`
        });

        if (data['leave-policy'] === 'payout') {
            analysis.push({
                type: 'positive',
                title: 'Leave Payout Available',
                content: `Unused AL days will be paid out at your daily salary rate. This provides additional compensation beyond your notice period.`
            });
        } else if (data['leave-policy'] === 'forfeit') {
            analysis.push({
                type: 'warning',
                title: 'Use-it-or-Lose-it Policy',
                content: `Unused AL days will be forfeited. Consider using AL during your notice period to maximize value.`
            });
        }

        if (data['salary-cycle'] === 'monthly') {
            analysis.push({
                type: 'tip',
                title: 'Monthly Salary Timing',
                content: 'Consider timing your last day near month-end to ensure full final salary payment and avoid pro-rating.'
            });
        }

        // Financial impact analysis
        const maxSalaryScenario = optimalScenario.totalSalaryDays;
        analysis.push({
            type: 'positive',
            title: 'Financial Impact',
            content: `Your optimal strategy provides ${maxSalaryScenario} days of total compensation (working days + AL payout/usage).`
        });

        analysis.push({
            type: 'legal',
            title: 'Hong Kong Employment Law',
            content: 'Under the Employment Ordinance, notice must be given in writing. Your employer may accept payment in lieu of notice at their discretion.'
        });

        return analysis;
    }
}

// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('resignation-form');
    const resultsSection = document.getElementById('results');
    const resultsContent = document.getElementById('results-content');
    const calculator = new HongKongEmploymentCalculator();

    // Set default values
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Set leave year start to January 1st of current year
    document.getElementById('leave-year-start').value = `${currentYear}-01-01`;
    
    // Set desired resignation date to today
    const today = currentDate.toISOString().split('T')[0];
    document.getElementById('desired-resignation-date').value = today;

    // Set default notice period (2 months calendar days is common in Hong Kong)
    document.getElementById('notice-period').value = '2';
    document.getElementById('notice-period-unit').value = 'months';
    document.getElementById('notice-period-type').value = 'calendar';
    
    // Set default AL remaining (8.7 days is reasonable mid-year with 20 total)
    document.getElementById('annual-leave-remaining').value = '8.7';

    // Handle notice period unit changes
    const noticePeriodInput = document.getElementById('notice-period');
    const noticePeriodUnit = document.getElementById('notice-period-unit');
    
    noticePeriodUnit.addEventListener('change', function() {
        if (this.value === 'days') {
            noticePeriodInput.max = '365';
            noticePeriodInput.placeholder = 'e.g., 30';
            if (parseInt(noticePeriodInput.value) > 365) {
                noticePeriodInput.value = '30';
            }
        } else if (this.value === 'months') {
            noticePeriodInput.max = '12';
            noticePeriodInput.placeholder = 'e.g., 2';
            if (parseInt(noticePeriodInput.value) > 12) {
                noticePeriodInput.value = '2';
            }
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        form.classList.add('loading');
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Debug: log form data to console
        console.log('Form data:', data);
        
        // Validate Hong Kong is selected
        if (data.country !== 'hong-kong') {
            alert('Currently only Hong Kong employment law is supported.');
            form.classList.remove('loading');
            return;
        }

        // Calculate optimal resignation strategy
        setTimeout(() => { // Simulate calculation time
            try {
                const result = calculator.calculateOptimalResignation(data);
                displayResults(result);
                resultsSection.classList.remove('hidden');
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Calculation error:', error);
                console.error('Error details:', error.message);
                alert(`Calculation error: ${error.message}`);
            }
            
            form.classList.remove('loading');
        }, 1000);
    });

    function displayResults(result) {
        resultsContent.innerHTML = '';

        // Show optimal scenario prominently with detailed breakdown
        const optimal = result.optimalScenario;
        const optimalCard = document.createElement('div');
        optimalCard.className = 'optimal-date';
        optimalCard.innerHTML = `
            <h3>🎯 Recommended Strategy: ${optimal.name}</h3>
            <div class="scenario-details">
                <div class="detail-grid">
                    <div class="detail-item">
                        <strong>Resignation Date:</strong> ${calculator.formatDate(new Date(optimal.resignationDate))}
                    </div>
                    <div class="detail-item">
                        <strong>Last Working Day:</strong> ${calculator.formatDate(new Date(optimal.lastWorkingDay))}
                    </div>
                    <div class="detail-item">
                        <strong>Contract End Date:</strong> ${calculator.formatDate(new Date(optimal.contractEndDate))}
                    </div>
                    <div class="detail-item highlight-al">
                        <strong>💎 Total AL Eligible:</strong> ${calculator.formatALDays(optimal.alRemainingByLastDay)} days
                    </div>
                    <div class="detail-item">
                        <strong>AL Used During Notice:</strong> ${calculator.formatALDays(optimal.alUsedDuringNotice)} days
                    </div>
                    <div class="detail-item">
                        <strong>AL Paid Out:</strong> ${calculator.formatALDays(optimal.alPaidOut)} days
                    </div>
                    <div class="detail-item">
                        <strong>Working Days in Notice:</strong> ${optimal.workingDaysInNotice} days
                    </div>
                    <div class="detail-item">
                        <strong>Total Salary Days:</strong> ${optimal.totalSalaryDays} days
                    </div>
                </div>
                <p class="description">${optimal.description}</p>
                <div class="pros-cons">
                    <div class="pros">
                        <h4>✅ Pros:</h4>
                        <ul>${optimal.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
                    </div>
                    <div class="cons">
                        <h4>❌ Cons:</h4>
                        <ul>${optimal.cons.map(con => `<li>${con}</li>`).join('')}</ul>
                    </div>
                </div>
            </div>
        `;
        resultsContent.appendChild(optimalCard);

        // Show all scenarios comparison as interactive table
        const scenariosCard = document.createElement('div');
        scenariosCard.className = 'result-card';
        scenariosCard.innerHTML = `
            <h3>📊 Resignation Strategies Comparison</h3>
            <p class="table-instruction">💡 Click on any row to view its calendar timeline below</p>
            <div class="scenarios-table-container">
                <table class="scenarios-table">
                    <thead>
                        <tr>
                            <th>Strategy</th>
                            <th>Resignation Date</th>
                            <th>Last Working Day</th>
                            <th>Contract End</th>
                            <th>💎 Total AL Eligible</th>
                            <th>AL Used</th>
                            <th>AL Paid Out</th>
                            <th>Total Salary Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.scenarios.map((scenario, index) => `
                            <tr class="scenario-row ${scenario === result.optimalScenario ? 'optimal-row' : ''}" 
                                data-scenario-index="${index}" 
                                onclick="selectScenario(${index})">
                                <td class="strategy-name">
                                    ${scenario.name} 
                                    ${scenario === result.optimalScenario ? '<span class="recommended-badge">⭐ Recommended</span>' : ''}
                                </td>
                                <td>${calculator.formatDate(new Date(scenario.resignationDate))}</td>
                                <td>${calculator.formatDate(new Date(scenario.lastWorkingDay))}</td>
                                <td>${calculator.formatDate(new Date(scenario.contractEndDate))}</td>
                                <td class="highlight-al"><strong>${calculator.formatALDays(scenario.alRemainingByLastDay)} days</strong></td>
                                <td>${calculator.formatALDays(scenario.alUsedDuringNotice)} days</td>
                                <td>${calculator.formatALDays(scenario.alPaidOut)} days</td>
                                <td class="highlight"><strong>${scenario.totalSalaryDays} days</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
        resultsContent.appendChild(scenariosCard);

        // Add calendar view container (initially shows optimal scenario)
        const calendarCard = document.createElement('div');
        calendarCard.className = 'result-card';
        calendarCard.id = 'calendar-card';
        calendarCard.innerHTML = `
            <h3 id="calendar-title">📅 Calendar View - ${optimal.name}</h3>
            <div class="calendar-legend">
                <div class="legend-item"><span class="legend-color resignation"></span> R = Resignation Date</div>
                <div class="legend-item"><span class="legend-color last-work"></span> L = Last Working Day</div>
                <div class="legend-item"><span class="legend-color contract-end"></span> E = Contract End</div>
                <div class="legend-item"><span class="legend-color al"></span> AL = Annual Leave</div>
                <div class="legend-item"><span class="legend-color holiday"></span> H = Public Holiday</div>
                <div class="legend-item"><span class="legend-color weekend"></span> Weekend</div>
            </div>
            <div id="calendar-content">
                ${calculator.generateCalendarView(optimal)}
            </div>
        `;
        resultsContent.appendChild(calendarCard);

        // Store scenarios globally for table interaction
        window.resignationScenarios = result.scenarios;
        window.resignationCalculator = calculator;
        
        // Initialize with optimal scenario selected
        selectScenario(result.scenarios.indexOf(result.optimalScenario));

        // Show analysis insights
        result.analysis.forEach(insight => {
            const insightCard = createResultCard(
                insight.type === 'warning' ? 'warning-card' : 'result-card',
                getInsightIcon(insight.type) + ' ' + insight.title,
                '',
                [insight.content]
            );
            resultsContent.appendChild(insightCard);
        });

        // Add important notice about AL calculations
        const alNoticeCard = createResultCard(
            'warning-card',
            '⚠️ Important: Annual Leave Policy Impact',
            '',
            [
                '📊 The calculations above show the mathematical allocation of your AL days',
                '💰 Actual payout depends on your company\'s leave policy:',
                '• "Full Payout": You get paid for all unused AL (best case)',
                '• "Partial Payout": You get paid for some AL (typically 50%)',
                '• "Use or Lose": No payout for unused AL (use during notice or lose)',
                '🔍 Check your employment contract or HR policy for exact terms',
                '💡 The scenarios help you optimize within your policy constraints'
            ]
        );
        resultsContent.appendChild(alNoticeCard);

        // Add action steps
        const actionsCard = createResultCard(
            'result-card',
            '✅ Next Steps',
            '',
            [
                '1. Review the recommended strategy and alternative scenarios above',
                '2. Verify your company\'s AL payout policy with HR',
                '3. Consider your personal priorities (time off vs. cash compensation)',
                '4. Check your employment contract for any special notice clauses',
                '5. Plan your resignation timing based on the optimal scenario',
                '6. Prepare your resignation letter with the calculated dates',
                '7. Discuss handover timeline with your manager'
            ]
        );
        resultsContent.appendChild(actionsCard);
    }

    function createResultCard(className, title, subtitle, points) {
        const card = document.createElement('div');
        card.className = className;
        
        let html = `<h3>${title}</h3>`;
        if (subtitle) html += `<h4>${subtitle}</h4>`;
        
        points.forEach(point => {
            html += `<p>${point}</p>`;
        });
        
        card.innerHTML = html;
        return card;
    }

    function getInsightIcon(type) {
        const icons = {
            'info': 'ℹ️',
            'positive': '✅',
            'warning': '⚠️',
            'tip': '💡',
            'legal': '⚖️'
        };
        return icons[type] || 'ℹ️';
    }
});

// Add enhanced styling for the detailed results display
const additionalCSS = `
.detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin: 20px 0;
}

.detail-item {
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    border-left: 3px solid #047857;
    font-size: 0.95rem;
}

.detail-item strong {
    display: block;
    color: #065f46;
    font-size: 0.85rem;
    margin-bottom: 2px;
}

.pros-cons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 16px;
}

.pros h4, .cons h4 {
    margin: 0 0 8px 0;
    font-size: 1rem;
}

.pros ul, .cons ul {
    margin: 0;
    padding-left: 20px;
    font-size: 0.9rem;
}

.pros li {
    color: #047857;
    margin-bottom: 4px;
}

.cons li {
    color: #dc2626;
    margin-bottom: 4px;
}

.scenarios-comparison {
    display: grid;
    gap: 16px;
    margin-top: 16px;
}

.scenario-card {
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    border-left: 4px solid #e2e8f0;
}

.scenario-card.optimal-scenario {
    background: #f0fdf4;
    border-left-color: #22c55e;
}

.scenario-card h4 {
    margin: 0 0 12px 0;
    color: #374151;
    font-size: 1.1rem;
}

.scenario-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 8px;
    margin: 12px 0;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    background: white;
    border-radius: 4px;
    font-size: 0.9rem;
}

.summary-row.highlight {
    background: #fef3c7;
    font-weight: 600;
}

.scenario-description {
    margin: 12px 0 8px 0;
    color: #4b5563;
    font-size: 0.9rem;
    font-style: italic;
}

.scenario-score {
    text-align: right;
    font-size: 0.8rem;
    color: #6b7280;
    font-weight: 500;
}

.calendar-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.legend-item {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #374151;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
    margin-right: 6px;
    border: 1px solid #d1d5db;
}

.legend-color.resignation { background: #ef4444; }
.legend-color.last-work { background: #3b82f6; }
.legend-color.contract-end { background: #10b981; }
.legend-color.al { background: #f59e0b; }
.legend-color.holiday { background: #8b5cf6; }
.legend-color.weekend { background: #6b7280; }

.table-instruction {
    margin: 10px 0;
    color: #6b7280;
    font-size: 0.9rem;
    font-style: italic;
}

.scenarios-table-container {
    overflow-x: auto;
    margin: 20px 0;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
}

.scenarios-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    background: white;
}

.scenarios-table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 14px 12px;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    border-bottom: 2px solid #e2e8f0;
    white-space: nowrap;
}

.scenarios-table td {
    padding: 14px 12px;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
    font-size: 0.95rem;
}

.scenario-row {
    cursor: pointer;
    transition: all 0.2s ease;
}

.scenario-row:hover {
    background: #f8fafc;
}

.scenario-row.optimal-row {
    background: #f0fdf4;
}

.scenario-row.optimal-row:hover {
    background: #dcfce7;
}

.scenario-row.selected-row {
    background: #eff6ff !important;
    border-left: 4px solid #3b82f6;
}

.strategy-name {
    font-weight: 600;
    min-width: 200px;
    max-width: 250px;
}

.recommended-badge {
    display: inline-block;
    background: #fbbf24;
    color: #92400e;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 12px;
    margin-left: 8px;
    font-weight: 500;
}



@media (max-width: 768px) {
    .detail-grid {
        grid-template-columns: 1fr;
    }
    
    .pros-cons {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    
    .scenario-summary {
        grid-template-columns: 1fr;
    }
    
    .calendar-legend {
        grid-template-columns: 1fr;
        gap: 8px;
    }
    
    .scenarios-table {
        font-size: 0.8rem;
    }
    
    .scenarios-table th,
    .scenarios-table td {
        padding: 10px 6px;
    }
    
    .strategy-name {
        min-width: 140px;
        max-width: 180px;
    }
    
    .recommended-badge {
        font-size: 0.7rem;
        padding: 1px 4px;
        display: block;
        margin-top: 4px;
    }
}
`;

// Function to handle scenario selection from table
function selectScenario(index) {
    console.log(`Selecting scenario ${index}`); // Debug log
    const scenarios = window.resignationScenarios;
    const calculator = window.resignationCalculator;
    
    if (!scenarios || !calculator || !scenarios[index]) {
        console.error('Missing scenarios, calculator, or invalid index:', { scenarios: !!scenarios, calculator: !!calculator, index, valid: !!scenarios?.[index] });
        return;
    }
    
    const selectedScenario = scenarios[index];
    console.log('Selected scenario:', selectedScenario.name); // Debug log
    
    // Update table row selection
    const rows = document.querySelectorAll('.scenario-row');
    rows.forEach((row, i) => {
        if (i === index) {
            row.classList.add('selected-row');
        } else {
            row.classList.remove('selected-row');
        }
    });
    
    // Update calendar title
    const calendarTitle = document.getElementById('calendar-title');
    if (calendarTitle) {
        calendarTitle.textContent = `📅 Calendar View - ${selectedScenario.name}`;
    }
    
    // Update calendar content
    const calendarContent = document.getElementById('calendar-content');
    if (calendarContent) {
        console.log('Updating calendar content...'); // Debug log
        calendarContent.innerHTML = calculator.generateCalendarView(selectedScenario);
    } else {
        console.error('Calendar content element not found');
    }
}

// Make selectScenario globally available
window.selectScenario = selectScenario;

// DATA VERIFICATION PROCESS FOR DEVELOPERS:
// When extending to new countries or updating holidays:
// 1. Always use OFFICIAL government sources (see constructor comments)
// 2. Verify dates against published government holiday schedules  
// 3. Update getHolidayDataSource() method with source information
// 4. Test thoroughly with real dates from the target year
// 5. Add proper legal disclaimers for the jurisdiction

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style); 
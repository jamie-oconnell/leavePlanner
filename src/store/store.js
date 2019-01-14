import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        leaveModalActive: false,
        leaveStartDate : new Date(),
        leaveEndDate: new Date(),
        mouseCurrentlyDown : false,
        publicHolidays: [],
        tableData: [],
        selectedDates : []
    }
})
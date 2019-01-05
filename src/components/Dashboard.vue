<template>
  <div>
    <AddLeaveModal />
    <Menu />
    <div class="container">
      <table style="margin: 0 auto;">
        <thead>
          <tr>
            <td></td>
            <td>
              <div class="monthHeading">
                <a @click="changeMonth(-1)">
                  <b-icon icon="arrow-left-bold-circle-outline"></b-icon>

                </a>
                <span
                  style="flex: 1; text-align: center;"
                  id="selectedMonth"
                >{{monthToString()}} {{this.currentYear}}</span>
                <a @click="changeMonth(1)">
                  <b-icon icon="arrow-right-bold-circle-outline"></b-icon>

                </a>

              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td style="padding-bottom: 10px;">
              <table>
                <thead>
                  <tr>
                    <th
                      class="day-heading"
                      v-for="(day, index) in tableData"
                      :key="index"
                    >
                      <a href="">{{day}}</a>
                    </th>
                  </tr>
                </thead>
              </table>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            :data-userid="person.id"
            :data-username='person.name'
            v-for="(person, index) in staff"
            :key="index"
          >
            <th class="person">

              <div>
                <span class="staffName">
                  <a>{{person.name}}</a>
                </span>
              </div>

              <span class="staffTitle">{{person.title}}</span>
            </th>
            <td>
              <MonthDays
                :currentYear="currentYear"
                :selectedMonth="selectedMonth"
              />
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>

</template>

<script>
import Menu from "@/components/Menu";
import MonthDays from "@/components/MonthDays";
import AddLeaveModal from "@/components/AddLeaveModal";
import db from "@/firebaseInit";
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  eachDay,
  format,
  getYear,
  addDays,
  getMonth
} from "date-fns";
export default {
  data() {
    return {
      tableData: [],
      staff: [],
      currentYear: getYear(new Date()),
      month: 1,
      selectedMonth: getMonth(new Date())
    };
  },
  created() {
    this.updateTableHeadings()
    db.collection("staff")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            name: doc.data().name,
            level: doc.data().level,
            title: doc.data().title,
            id: doc.id
          };
          this.staff.push(data);
        });
      });
  },
  methods: {
    monthToString: function() {
      return format(new Date(this.currentYear, this.selectedMonth), "MMMM");
    },
    changeMonth(value) {
      this.selectedMonth += value;
      this.updateTableHeadings()
      this.getLeaveData()
    },
    updateTableHeadings() {
      // Create day headings e.g sat, sun ,mon
      this.tableData = [];
      const days = [];

      const monthStartDate = startOfMonth(
        new Date(this.currentYear, this.selectedMonth)
      );
      const monthEndDate = endOfMonth(
        new Date(this.currentYear, this.selectedMonth)
      );
      const monthDays = eachDay(monthStartDate, monthEndDate);
      monthDays.forEach(day => {
        days.push(format(`${day}`, "dd"));
      });
      this.tableData.push(...days);
    },
    getLeaveData(){
      db.collection("leave").where("month", "==", this.selectedMonth)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            duration: doc.data().duration,
            id: doc.id
          };
          console.log(data);
        });
      });
    }
  },
  components: {
    Menu,
    MonthDays,
    AddLeaveModal
  }
};
</script>

<style>
.table td,
.table th {
  border: none !important;
}

td {
  font-size: 12px;
  padding: 0;
  overflow: hidden;
}

th.person {
  font-size: 14px;
  width: 200px;
  font-weight: 500;
  padding-bottom: 15px;
}

.staffTitle {
  color: #747478;
}

.table .staffName {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
}

.day-heading {
  width: 30px !important;
  min-width: 30px !important;
  max-width: 30px !important;
  text-align: center;
}

.monthHeading {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

#selectedMonth {
  font-size: 18px;
}
</style>

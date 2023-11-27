<template>
  <table class="table mt-5 p-5">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Cinema</th>
        <th scope="col">Seat</th>
        <th scope="col">Date</th>
        <th scope="col">Price</th>
        <th scope="col">Status</th>
        <th scope="col">Payment</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(book, index) in booked" :key="book.id">
        <td>{{ ++index }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.cinema }}</td>
        <td>{{ book.seat }}</td>
        <td>{{ formatDate(book.date) }}</td>
        <td>{{ formatPrice(book.price) }}</td>
        <td>{{ formatStatus(book.status) }}</td>
        <td>
          <button class="btn btn-primary" @click="status(book.id)" v-if="book.status === false" type="button">
            Pay Now!
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useMovieStore } from "../stores/main";
export default {
  name: "BookView",
  computed: {
    ...mapState(useMovieStore, ["booked"]),
  },
  methods: {
    ...mapActions(useMovieStore, ["fetchBook",'updatePayment']),
    formatDate(date) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    formatPrice(price) {
      const formattedPrice = parseFloat(price).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formattedPrice;
    },
    formatStatus(status) {
      return status ? "Paid" : "Unpaid";
    },
    status(id) {
      this.updatePayment(id);
    },
  },
  created() {
    this.fetchBook();
  },
  getters: {},
};
</script>

<style>
</style>
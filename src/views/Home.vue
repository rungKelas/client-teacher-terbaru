<template>
  <div class="dashboard-page">
    <b-row>
        <b-col xs="12">
          <Widget
            title="<h5>Student <span class='fw-semi-bold'>List</span></h5>"
            bodyClass="widget-table-overflow"
            customHeader
          >
            <div class="table-responsive">
              <table class="table table-striped table-lg mb-0 requests-table">
                <thead>
                  <tr class="text-muted">
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>BIRTH DATE</th>
                    <th>ADDRESS</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in mock.table"
                    :key="row.id"
                  >
                    <td>{{row.name}}</td>
                    <td>{{row.email}}</td>
                    <td>{{row.birthDate}}</td>
                    <td>{{row.address}}</td>
                    <td>
                      <b-badge
                        :variant="row.status === 'Pending'
                          ? 'success'
                          : row.status === 'Not Yet' ? 'danger' : 'info'"
                        pill
                      >
                        {{row.status}}
                      </b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Widget>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import mock from './mock';

import { Chart } from 'highcharts-vue';

export default {
  name: 'Home',
  components: {
    Widget, highcharts: Chart
  },
  data() {
    return {
      mock
    };
  }
};
</script>


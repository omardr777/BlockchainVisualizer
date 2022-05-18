<template>
    <p v-if="this.trans.length == 0">No Transaction</p>
    <table class="table table-striped" v-else>
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Amount</th>
                <th scope="col">Valid?</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tx,index) in this.trans" :key="index">
                <td>{{index}}</td>
                <td class="text-truncate" style="max-width: 100px;">
                    <span v-if="tx.fromAddress != 'System'">
                        <router-link :to="{name:'walletBalance',params:{id:tx.fromAddress}}" class="nav-link" style="color:blue">{{tx.fromAddress}}</router-link>
                    </span>
                    <span v-else>System</span>
                </td>
                <td class="text-truncate" style="max-width: 100px;">
                     <span>
                        <router-link :to="{name:'walletBalance',params:{id:tx.toAddress}}" class="nav-link" style="color:blue">{{tx.toAddress}}</router-link>
                    </span>
                    
                </td>
                <td class="text-truncate" style="max-width: 100px;">
                 <span>{{tx.amount}}</span>
                </td>
                <td style="max-width: 40px;">
                    <span v-if="tx.isValid()">✓</span>
                    <span v-if="!tx.isValid()">✗</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props:['trans']
}
</script>

<style>

</style>
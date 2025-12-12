<script setup lang="ts">
const ipInput = ref("");
const router = useRouter();

const handleSearch = () => {
  const ip = ipInput.value.trim();
  if (ip) router.push({ path: "/", query: { ip } });
  else router.push("/");
};
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 p-4 mb-6">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="ipInput"
        type="text"
        placeholder="Enter IP address (e.g. 1.1.1.1)"
        class="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-500 text-slate-700 dark:text-slate-200"
      />
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  </div>
</template>

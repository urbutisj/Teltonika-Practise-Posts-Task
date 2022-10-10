<template>
    <ul class="pagination">
        <li class="pagination-item">
            <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">&lt;&lt;</button>
        </li> 
        <li class="pagination-item">
            <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">&lt;</button>
        </li>
        <li v-for="page in pages" :key="page.name" class="pagination-item">
            <button type="button" :class="{ active: isPageActive(page.name) }" @click="onClickPage(page.name)" :disabled="page.isDisabled"> {{ page.name }}</button>
        </li>
        <li class="pagination-item">
            <button type="button" @click="onClickNextPage" :disabled="isInLastPage">&gt;</button>
        </li>
        <li class="pagination-item">
            <button type="button" @click="onClickLastPage" :disabled="isInLastPage">&gt;&gt;</button>
        </li>
    </ul>
  </template>
  
  <script>
  export default {
    data() {
        return{
            totalPages : Math.ceil(this.filteredBlogs.length / this.perPage)
        }
        
    },
    props: {
      maxVisibleButtons: {
        type: Number,
        required: false,
        default: 3
      },
      perPage: {
        type: Number,
        required: true
      },
      currentPage: {
        type: Number,
        required: true
      },
      filteredBlogs: {
        type: Array,
        required: true
      }
    },
    computed: {
        startPage() {
            // When on the first page
            if (this.currentPage === 1) {
                return 1;
            }
            // When on the last page
            if (this.currentPage === this.totalPages) {
                const start = this.totalPages - (this.maxVisibleButtons - 1);

                if (start === 0) {
                    return 1;
                } else {
                    return start;
                }
            }

            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for ( let i = this.startPage; i <= this.totalPages; i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    }, 
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        }
    }
  };
  </script>


<style>
.pagination{
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    display: flex;
}
.pagination-item:first-child button{
  border-top-left-radius: .25rem;
  border-bottom-left-radius: .25rem;
}
.pagination-item:last-child button{
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
}
.pagination-item button{
    padding: 0.5rem 0.8rem;
    border: 1px solid #dee2e6;
}
.pagination-item button.disabled{ 
  color: #6c757d;
  border: 1px solid #dee2e6;
}
.pagination-item button.active {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
</style>
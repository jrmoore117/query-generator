export default [
   // Category
   { label: 'Sector', value: 'sector', column: 'category.sector', type: 'staticString' },
   { label: 'Industry Group', value: 'industryGroup', column: 'category.industryGroup', type: 'staticString' },
   { label: 'Industry', value: 'industry', column: 'category.industry', type: 'staticString' },
   { label: 'Sub-Industry', value: 'subIndustry', column: 'category.subIndustry', type: 'staticString' },

   // Other - ADD COLUMN NAMES
   { label: 'Company Tags', value: 'companyTags', column: '', type: 'staticString' },
   { label: 'Country', value: 'country', column: '', type: 'staticString' },
   { label: 'Type', value: 'type', column: '', type: 'staticString' },

   // Metrics
   { label: 'Employees Range', value: 'employeesRange', column: 'metrics.employeesRange', type: 'staticString' },
   { label: 'Revenue Range', value: 'revenueRange', column: 'metrics.revenueRange', type: 'staticString' },
]
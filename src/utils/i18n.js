// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  
  const hasKey = this.$te('route.' + title)
  if (hasKey) {
    return this.$t('route.' + title)
  }
  return title
  
 /*
   console.log('tag:', tag)
   var title = tag.title//tag.path.split('/')[-1]
   return title
   */
}

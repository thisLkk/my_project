<script>
import { dictSets } from '@/utils'
function dictItems(category) {
  return dictSets(category)
}

function notify(object, operation, code) {
  if (code === '0') {
    object.$notify({
      title: operation,
      message: operation + '成功',
      type: 'success',
      duration: 2000
    })
  } else {
    object.$notify.error({
      title: operation,
      message: operation + '失败',
      type: 'success',
      duration: 2000
    })
  }
}

function backPage(object) {
  object.$store.dispatch('delVisitedViews', object.$router.currentRoute)
    .then((views) => {
      object.$router.go(-1)
    })
}

const bo_path = 'bo'
const rest_path = 'rest'

const navmenusMode = 'dropdown'   // 'common'常规模式，'dropdown' 下拉方式

export default
{
  dictItems,
  notify,
  bo_path,
  rest_path,
  backPage,
  navmenusMode
}
</script>
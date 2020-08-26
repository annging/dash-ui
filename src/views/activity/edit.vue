<template>
  <activity-editor :is-edit="true" />
</template>

<script>
import ActivityEditor from './components/ActivityEditor'

export default {
  name: 'HdEdit',
  components: { ActivityEditor }
}
</script>


<template>
  <div class="notification-container">
    <div class="notification-header">
      <h3>お知らせ・通知</h3>
    </div>
    
    <div class="notification-list">
      <div v-for="notification in displayedNotifications" :key="notification.id" class="notification-item" :class="{'unread': !notification.read}">
        <!-- 通知内容 -->
        <div class="notification-content">
          <div class="notification-date" :class="{'text-red-600': !notification.read}">
            <span v-if="notification.label" class="notification-label" :class="getLabelClass(notification.label)">
              {{ notification.label }}
            </span>
            <span class="date-text">{{ notification.date }}</span>
          </div>
          <div class="notification-text">{{ notification.text }}</div>
        </div>
      </div>
      
      <!-- もっと見るボタン -->
      <div v-if="hasMoreNotifications" class="more-button-container">
        <button class="more-button" @click="showMoreNotifications">
          もっと見る
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const notifications = ref([
  {
    id: 1,
    text: '車検のお知らせ: お持ちの車両「トヨタ プリウス」の車検期限が残り3ヶ月です。',
    date: '12/1 00:00',
    read: false,
    label: '新着'
  },
  {
    id: 2,
    text: '予約完了: 12月15日 10:00のオイル交換予約が確定しました。',
    date: '12/1 00:00',
    read: false,
    label: '新着'
  },
  {
    id: 3,
    text: '年末年始（12/29～1/3）は休業となります。',
    date: '11/25 00:00',
    read: false,
    label: '重要'
  },
  {
    id: 4,
    text: '冬季シーズンが近づいています。スタッドレスタイヤへの交換はお早めに。',
    date: '11/20 00:00',
    read: true,
    label: 'お知らせ'
  },
  {
    id: 5,
    text: '会員様限定、次回オイル交換10%オフクーポンをプレゼント。',
    date: '11/15 00:00',
    read: true,
    label: 'クーポン'
  },
  {
    id: 6,
    text: '定期点検のススメ - エンジンオイルの交換時期について',
    date: '11/10 00:00',
    read: true,
    label: 'メンテナンス'
  },
  {
    id: 7,
    text: '11/5 深夜1:00〜3:00はシステムメンテナンスのため予約機能がご利用いただけません。',
    date: '11/1 00:00',
    read: true,
    label: 'システム'
  }
]);

// 表示件数を管理
const displayLimit = ref(5);

// 表示する通知リスト
const displayedNotifications = computed(() => {
  return notifications.value.slice(0, displayLimit.value);
});

// もっと表示するボタンを表示するかどうか
const hasMoreNotifications = computed(() => {
  return notifications.value.length > displayLimit.value;
});

// もっと見るボタンをクリックしたときの処理
const showMoreNotifications = () => {
  // すべての通知を表示
  displayLimit.value = notifications.value.length;
};

// ラベルの種類に応じたクラスを返す
const getLabelClass = (label) => {
  switch(label) {
    case '新着':
      return 'text-blue-600';
    case '重要':
      return 'text-red-600';
    case 'クーポン':
      return 'text-green-600';
    case 'メンテナンス':
      return 'text-yellow-600';
    case 'システム':
      return 'text-gray-600';
    case 'お知らせ':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};
</script>

<style scoped>
.notification-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #fff;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

.notification-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background-color: #f0f9ff;
}

.notification-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.notification-date {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  margin-right: 1.5rem;
  min-width: 160px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-label {
  font-style: normal;
  font-weight: 600;
  width: 70px;
  text-align: right;
  margin-right: 20px;
  display: inline-block;
}

.date-text {
  color: #6b7280;
  width: 70px;
  text-align: left;
}

.notification-text {
  font-size: 0.875rem;
  color: #1f2937;
  flex: 1;
}

.more-button-container {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.more-button {
  background-color: transparent;
  color: #1a56db;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid #1a56db;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.more-button:hover {
  background-color: #f0f5ff;
}
</style>
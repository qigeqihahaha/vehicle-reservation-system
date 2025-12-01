<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- ヘッダー部分 - 背景画像を変更 - 高度を調整 -->
    <div
      class="bg-cover bg-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <div
        class="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-white"
      >
        <!-- py-16 md:py-24 を py-10 md:py-16 に変更して高度を減少 -->
        <div class="container mx-auto px-4 py-10 md:py-16">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="md:w-1/2 mb-6 md:mb-0">
              <!-- フォントサイズを小さくする -->
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                車両メンテナンスを<br />もっとスマートに
              </h1>
              <p class="text-base md:text-lg opacity-90 mb-6">
                簡単な操作でメンテナンス予約が完了。<br />お客様の大切な車両を最適な状態に保ちます。
              </p>
              <div class="flex flex-col sm:flex-row gap-3 flex-wrap">
                <n-button
                  ghost
                  size="medium"
                  class="text-white border-white hover:bg-white/10 rounded-lg"
                  @click="scrollToSection('features')"
                >
                  サービスの特徴
                </n-button>
                <n-button
                  ghost
                  size="medium"
                  class="text-white border-white hover:bg-white/10 rounded-lg"
                  @click="scrollToSection('services')"
                >
                  サービス詳細
                </n-button>
                <n-button
                  ghost
                  size="medium"
                  class="text-white border-white hover:bg-white/10 rounded-lg"
                  @click="scrollToSection('reservation-flow')"
                >
                  予約の流れ
                </n-button>
              </div>
            </div>
            <div class="md:w-1/2 flex justify-center">
              <!-- 画像サイズを調整 -->
              <img
                src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?ixlib=rb-4.0.3&auto=format&fit=crop&w=350&q=80"
                alt="車両メンテナンスイメージ"
                class="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知バナー - コンテナ内に配置 -->
    <div class="container mx-auto px-4 py-4">
      <notification-banner />
    </div>

    <!-- 特徴セクション -->
    <div id="features" class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">サービスの特徴</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          当システムは、車両メンテナンス予約プロセスを簡素化し、お客様の車両を最適な状態に保つお手伝いをします。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 特徴1 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md relative"
        >
          <div
            class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-3">簡単予約</h3>
          <p class="text-gray-600">
            数クリックでメンテナンス予約が完了。お客様の時間を大切にします。
          </p>
        </div>

        <!-- 特徴2 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md relative"
        >
          <div
            class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-3">車両管理</h3>
          <p class="text-gray-600">
            お持ちの車両情報を一元管理。車検や点検時期も自動でお知らせします。
          </p>
        </div>

        <!-- 特徴3 -->
        <div
          class="bg-white p-6 rounded-xl shadow-md relative"
        >
          <div
            class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800 mb-3">
            プロフェッショナル整備
          </h3>
          <p class="text-gray-600">
            熟練の整備士による高品質なメンテナンスサービスをご提供します。
          </p>
        </div>
      </div>
    </div>

    <!-- サービス詳細セクション -->
    <div id="services" class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">サービス詳細</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            当システムでは以下のメンテナンスサービスをご提供しています。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- サービス1 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">オイル交換</h3>
            <p class="text-gray-600 mb-3">
              エンジンオイルの交換を行います。エンジンの寿命を延ばし、燃費向上にも効果的です。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約30分 / 料金: ¥3,000〜
            </p>
          </div>

          <!-- サービス2 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">車検</h3>
            <p class="text-gray-600 mb-3">
              法定点検と必要な整備を行い、車検証の更新手続きまで代行します。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約2時間 / 料金: ¥50,000〜
            </p>
          </div>

          <!-- サービス3 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">タイヤ交換</h3>
            <p class="text-gray-600 mb-3">
              タイヤの交換作業を行います。季節に合わせたタイヤ交換も対応可能です。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約1時間 / 料金: ¥8,000〜
            </p>
          </div>

          <!-- サービス4 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              ブレーキパッド交換
            </h3>
            <p class="text-gray-600 mb-3">
              ブレーキパッドの点検・交換を行います。安全な走行のために定期的な点検をおすすめします。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約1時間 / 料金: ¥10,000〜
            </p>
          </div>

          <!-- サービス5 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              バッテリー交換
            </h3>
            <p class="text-gray-600 mb-3">
              バッテリーの点検・交換を行います。エンジン始動トラブルを未然に防ぎます。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約30分 / 料金: ¥15,000〜
            </p>
          </div>

          <!-- サービス6 -->
          <div
            class="bg-white p-6 rounded-xl shadow-md relative border border-gray-100"
          >
            <div
              class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              エアコン点検・整備
            </h3>
            <p class="text-gray-600 mb-3">
              エアコンの点検・整備・ガス補充を行います。快適なドライブをサポートします。
            </p>
            <p class="text-sm text-gray-500">
              所要時間: 約1時間 / 料金: ¥8,000〜
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <n-button
            type="primary"
            size="large"
            class="rounded-lg"
            @click="goToReservation"
          >
            今すぐメンテナンス予約
          </n-button>
        </div>
      </div>
    </div>

    <!-- 予約ステップ -->
    <div id="reservation-flow" class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">
            メンテナンス予約の流れ
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            シンプルな8ステップでメンテナンス予約が完了します。
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- ステップ1 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              1
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              サービス選択
            </h3>
            <p class="text-gray-600">
              オイル交換、車検、タイヤ交換など必要なサービスを選びます。
            </p>
          </div>

          <!-- ステップ2 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              2
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              店舗選択
            </h3>
            <p class="text-gray-600">お近くの店舗を選択します。</p>
          </div>

          <!-- ステップ3 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              3
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              日時選択
            </h3>
            <p class="text-gray-600">ご都合の良い日付と時間帯を選択します。</p>
          </div>

          <!-- ステップ4 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              4
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              車両選択
            </h3>
            <p class="text-gray-600">登録済みのお客様の車両から選択します。</p>
          </div>

          <!-- ステップ5 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              5
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              代車選択
            </h3>
            <p class="text-gray-600">
              メンテナンス中に代車が必要かどうか選択します。
            </p>
          </div>

          <!-- ステップ6 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              6
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              クーポン選択
            </h3>
            <p class="text-gray-600">
              お持ちのクーポンを適用して割引を受けられます。
            </p>
          </div>

          <!-- ステップ7 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              7
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              予約内容の確認
            </h3>
            <p class="text-gray-600">
              予約内容を確認して問題がないか確認します。
            </p>
          </div>

          <!-- ステップ8 -->
          <div class="bg-white p-6 rounded-xl shadow-md relative">
            <div
              class="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg"
            >
              8
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3 mt-4">
              予約確定
            </h3>
            <p class="text-gray-600">
              予約を確定して完了です。予約確認メールが送信されます。
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <n-button
            type="primary"
            size="large"
            class="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            @click="goToReservation"
          >
            今すぐメンテナンス予約
          </n-button>
        </div>
      </div>
    </div>

    <!-- よくある質問 -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">よくある質問</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          ご不明な点がございましたら、以下のFAQをご確認ください。
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <n-collapse>
          <n-collapse-item
            title="メンテナンス予約のキャンセルはできますか？"
            name="1"
          >
            <div class="p-2">
              はい、予約開始時間の24時間前までであればキャンセル可能です。マイページの「予約履歴」から該当の予約を選択し、キャンセル手続きを行ってください。
            </div>
          </n-collapse-item>
          <n-collapse-item title="予約の変更方法を教えてください" name="2">
            <div class="p-2">
              予約の変更は、マイページの「予約履歴」から該当の予約を選択し、「予約変更」ボタンをクリックして行うことができます。ただし、予約開始時間の24時間前までに限ります。
            </div>
          </n-collapse-item>
          <n-collapse-item
            title="メンテナンスにかかる時間はどのくらいですか？"
            name="3"
          >
            <div class="p-2">
              メンテナンス内容によって異なります。オイル交換は約30分、車検は約2時間、タイヤ交換は約1時間が目安です。予約時に所要時間をご確認いただけます。
            </div>
          </n-collapse-item>
          <n-collapse-item title="予約の確認メールが届きません" name="4">
            <div class="p-2">
              予約確定後、登録されたメールアドレスに確認メールが自動送信されます。届かない場合は、迷惑メールフォルダをご確認いただくか、サポートまでお問い合わせください。
            </div>
          </n-collapse-item>
        </n-collapse>
      </div>
    </div>

    <!-- CTA セクション - 背景画像を変更 -->
    <div
      class="bg-cover bg-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
      "
    >
      <div
        class="bg-gradient-to-r from-blue-900/90 to-indigo-900/90 text-white py-16"
      >
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-6">
            今すぐ車両メンテナンス予約を始めましょう
          </h2>
          <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            お客様の大切な車両を最適な状態に保つために、定期的なメンテナンスをお忘れなく。
          </p>
          <n-button
            size="large"
            class="bg-white text-blue-700 hover:bg-blue-50 rounded-lg px-8 py-2"
            @click="goToReservation"
          >
            メンテナンス予約を開始
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NButton, NCollapse, NCollapseItem } from "naive-ui";
import { useRouter } from "vue-router";
import NotificationBanner from "../components/notification/NotificationBanner.vue";

const router = useRouter();

// メンテナンス予約画面に遷移する関数
function goToReservation() {
  router.push("/reservation/service");
}

// 指定したセクションにスクロールする関数
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
</script>
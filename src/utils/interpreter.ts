
export function taskTypeToRussian(taskType) {
    return {
        Start: 'Старт!',
        AutoCheck: "Автопроверка",
        Publish: "Публикация",
        DesignReview: "Дизайн ревью",
        MasterReview: "Мастер ревью",
        TextReview: "Текст ревью",
    }[taskType];
  }
/**
 * Cron 表达式规则
 * *  *  *  *  *  *
 * ┬ ┬ ┬ ┬ ┬ ┬
 * │ │ │ │ │ |
 * │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
 * │ │ │ │ └───── month (1 - 12)
 * │ │ │ └────────── day of month (1 - 31)
 * │ │ └─────────────── hour (0 - 23)
 * │ └──────────────────── minute (0 - 59)
 * └───────────────────────── second (0 - 59, OPTIONAL)
 *
 * 样例：
 * - 每周 1 凌晨 1 点 1 分 执行
 * - 0 1 1 * * 1
 *
 */
import schedule from 'node-schedule';

export default class Interval {
  taskName: string; // 任务名字
  maintainTime: string; // 定时时间
  lastTask: string; // 上一次定时任务名字

  constructor({
    taskName,
    maintainTime,
    lastTask,
  }: {
    taskName: string;
    maintainTime: string;
    lastTask: string;
  }) {
    this.taskName = taskName;
    this.maintainTime = maintainTime;
    this.lastTask = lastTask || '';
  }

  // 生成新的定时任务
  async create(callback: (...args: any[]) => any) {
    // 终止之前的定时任务
    if (this.lastTask !== '') {
      this.delete(this.lastTask);
    }
    schedule.scheduleJob(`${this.taskName}`, `${this.maintainTime}`, callback);
  }

  // 删除定时任务
  delete(taskName: string) {
    if (schedule.scheduledJobs[taskName]) {
      schedule.scheduledJobs[taskName].cancel();
      return true;
    }
    return false;
  }

  // 找到一个定时任务
  findOne(name: string) {
    if (schedule.scheduledJobs[name]) {
      return schedule.scheduledJobs[name];
    } else {
      throw new Error('未找到任务名');
    }
  }

  // 查看所有的定时任务
  findAll() {
    return schedule.scheduledJobs;
  }
}

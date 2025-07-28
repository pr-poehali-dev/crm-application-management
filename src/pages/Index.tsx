import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const CRMDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { title: 'Активные заявки', value: '24', change: '+12%', icon: 'FileText' },
    { title: 'Исполнители', value: '8', change: '+2', icon: 'Users' },
    { title: 'Клиенты', value: '156', change: '+18%', icon: 'Building' },
    { title: 'Выполнено', value: '89%', change: '+5%', icon: 'CheckCircle' },
  ];

  const recentRequests = [
    { id: 1, title: 'Разработка веб-сайта', client: 'ООО Техно', executor: 'Иванов И.', status: 'В работе', priority: 'Высокий' },
    { id: 2, title: 'Настройка CRM', client: 'ИП Петров', executor: 'Сидоров С.', status: 'Новая', priority: 'Средний' },
    { id: 3, title: 'Консультация по IT', client: 'Альфа Групп', executor: 'Козлов К.', status: 'Завершена', priority: 'Низкий' },
    { id: 4, title: 'Аудит безопасности', client: 'Бета Лтд', executor: 'Морозов М.', status: 'В работе', priority: 'Высокий' },
  ];

  const executors = [
    { name: 'Иванов И.И.', role: 'Веб-разработчик', tasks: 5, rating: 4.8 },
    { name: 'Сидоров С.С.', role: 'Системный админ', tasks: 3, rating: 4.9 },
    { name: 'Козлов К.К.', role: 'Консультант', tasks: 7, rating: 4.7 },
    { name: 'Морозов М.М.', role: 'Специалист по безопасности', tasks: 2, rating: 5.0 },
  ];

  const meetings = [
    { time: '09:00', title: 'Встреча с клиентом ООО Техно', type: 'client' },
    { time: '11:30', title: 'Планерка команды', type: 'team' },
    { time: '14:00', title: 'Презентация проекта', type: 'presentation' },
    { time: '16:00', title: 'Консультация по CRM', type: 'consultation' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В работе': return 'bg-blue-100 text-blue-800';
      case 'Новая': return 'bg-green-100 text-green-800';
      case 'Завершена': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Высокий': return 'bg-red-100 text-red-800';
      case 'Средний': return 'bg-yellow-100 text-yellow-800';
      case 'Низкий': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-primary rounded-lg p-2">
              <Icon name="Building2" className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CRM System</h1>
              <p className="text-slate-600">Управление заявками и исполнителями</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Icon name="Bell" className="h-4 w-4 mr-2" />
              Уведомления
            </Button>
            <Avatar>
              <AvatarFallback>АД</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {[
                { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
                { id: 'requests', label: 'Заявки', icon: 'FileText' },
                { id: 'executors', label: 'Исполнители', icon: 'Users' },
                { id: 'clients', label: 'Клиенты', icon: 'Building' },
                { id: 'calendar', label: 'Календарь', icon: 'Calendar' },
                { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
                { id: 'settings', label: 'Настройки', icon: 'Settings' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon name={item.icon} className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                          <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Icon name={stat.icon} className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Requests */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="FileText" className="h-5 w-5" />
                      <span>Последние заявки</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900">{request.title}</h4>
                            <p className="text-sm text-slate-600">Клиент: {request.client}</p>
                            <p className="text-sm text-slate-600">Исполнитель: {request.executor}</p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon name="Calendar" className="h-5 w-5" />
                      <span>Календарь</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Executors Tab */}
            <TabsContent value="executors" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Исполнители</h2>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Добавить исполнителя
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {executors.map((executor, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="text-lg">
                            {executor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{executor.name}</h4>
                          <p className="text-sm text-slate-600">{executor.role}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Icon name="CheckSquare" className="h-4 w-4 text-slate-500" />
                              <span className="text-sm text-slate-600">{executor.tasks} задач</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-slate-600">{executor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Календарь встреч</h2>
                <Button>
                  <Icon name="Plus" className="h-4 w-4 mr-2" />
                  Запланировать встречу
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Календарь</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Встречи на сегодня</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meetings.map((meeting, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border border-slate-200 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-lg">
                            <Icon name="Clock" className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">{meeting.time}</p>
                            <p className="text-sm text-slate-600">{meeting.title}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Открыть
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Заявки</h2>
                <div className="flex space-x-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="new">Новые</SelectItem>
                      <SelectItem value="progress">В работе</SelectItem>
                      <SelectItem value="completed">Завершенные</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Icon name="Plus" className="h-4 w-4 mr-2" />
                    Создать заявку
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left p-4 font-semibold text-slate-900">ID</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Название</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Клиент</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Исполнитель</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Статус</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Приоритет</th>
                          <th className="text-left p-4 font-semibold text-slate-900">Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRequests.map((request) => (
                          <tr key={request.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 font-mono text-sm">#{request.id}</td>
                            <td className="p-4 font-semibold text-slate-900">{request.title}</td>
                            <td className="p-4 text-slate-600">{request.client}</td>
                            <td className="p-4 text-slate-600">{request.executor}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                {request.priority}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Icon name="Eye" className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Icon name="Edit" className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Отчеты</h2>
                <Button>
                  <Icon name="Download" className="h-4 w-4 mr-2" />
                  Экспорт данных
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика выполнения</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Завершенные заявки</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="mt-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>В работе</span>
                          <span>12%</span>
                        </div>
                        <Progress value={12} className="mt-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Новые заявки</span>
                          <span>3%</span>
                        </div>
                        <Progress value={3} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Производительность исполнителей</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {executors.map((executor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {executor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{executor.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">{executor.tasks} задач</span>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm">{executor.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CRMDashboard;
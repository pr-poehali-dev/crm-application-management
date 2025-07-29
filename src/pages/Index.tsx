import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const CRMDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isCreateMeetingOpen, setIsCreateMeetingOpen] = useState(false);
  const [notifications, setNotifications] = useState<{id: number, title: string, message: string, type: 'info' | 'success' | 'warning' | 'error', timestamp: Date}[]>([]);
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    client: '',
    executor: '',
    priority: 'Средний',
    deadline: ''
  });

  // Real-time notifications simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        { title: 'Новая заявка', message: 'Поступила заявка от ООО "Старт"', type: 'info' as const },
        { title: 'Задача выполнена', message: 'Иванов И. завершил веб-разработку', type: 'success' as const },
        { title: 'Приближается дедлайн', message: 'До завершения проекта осталось 2 дня', type: 'warning' as const },
        { title: 'Система обновлена', message: 'CRM система обновлена до версии 2.1', type: 'info' as const },
      ];

      if (Math.random() > 0.7) {
        const notification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        setNotifications(prev => [
          {
            id: Date.now(),
            ...notification,
            timestamp: new Date()
          },
          ...prev.slice(0, 4)
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [stats, setStats] = useState([
    { title: 'Активные заявки', value: '24', change: '+12%', icon: 'FileText', trend: [85, 89, 92, 88, 95, 91, 89] },
    { title: 'Исполнители', value: '8', change: '+2', icon: 'Users', trend: [6, 7, 7, 8, 8, 8, 8] },
    { title: 'Клиенты', value: '156', change: '+18%', icon: 'Building', trend: [120, 135, 142, 148, 151, 154, 156] },
    { title: 'Выполнено', value: '89%', change: '+5%', icon: 'CheckCircle', trend: [78, 82, 85, 87, 88, 89, 89] },
  ]);

  const [recentRequests, setRecentRequests] = useState([
    { id: 1, title: 'Разработка веб-сайта', client: 'ООО Техно', executor: 'Иванов И.', status: 'В работе', priority: 'Высокий' },
    { id: 2, title: 'Настройка CRM', client: 'ИП Петров', executor: 'Сидоров С.', status: 'Новая', priority: 'Средний' },
    { id: 3, title: 'Консультация по IT', client: 'Альфа Групп', executor: 'Козлов К.', status: 'Завершена', priority: 'Низкий' },
    { id: 4, title: 'Аудит безопасности', client: 'Бета Лтд', executor: 'Морозов М.', status: 'В работе', priority: 'Высокий' },
  ]);

  const executors = [
    { name: 'Иванов И.И.', role: 'Веб-разработчик', tasks: 5, rating: 4.8 },
    { name: 'Сидоров С.С.', role: 'Системный админ', tasks: 3, rating: 4.9 },
    { name: 'Козлов К.К.', role: 'Консультант', tasks: 7, rating: 4.7 },
    { name: 'Морозов М.М.', role: 'Специалист по безопасности', tasks: 2, rating: 5.0 },
  ];

  const [meetings, setMeetings] = useState([
    { time: '09:00', title: 'Встреча с клиентом ООО Техно', type: 'client' },
    { time: '11:30', title: 'Планерка команды', type: 'team' },
    { time: '14:00', title: 'Презентация проекта', type: 'presentation' },
    { time: '16:00', title: 'Консультация по CRM', type: 'consultation' },
  ]);

  // Interactive chart data
  const chartData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Выполненные задачи',
        data: [12, 19, 3, 5, 2, 3, 9],
        color: 'hsl(var(--primary))',
      },
      {
        label: 'Новые заявки',
        data: [2, 3, 20, 5, 1, 4, 6],
        color: 'hsl(var(--secondary))',
      }
    ]
  };

  const handleCreateRequest = () => {
    if (newRequest.title && newRequest.client) {
      const request = {
        id: recentRequests.length + 1,
        ...newRequest,
        status: 'Новая'
      };
      setRecentRequests(prev => [request, ...prev]);
      setNewRequest({ title: '', description: '', client: '', executor: '', priority: 'Средний', deadline: '' });
      setIsCreateRequestOpen(false);
      
      // Add success notification
      setNotifications(prev => [{
        id: Date.now(),
        title: 'Заявка создана',
        message: `Создана заявка "${newRequest.title}"`,
        type: 'success',
        timestamp: new Date()
      }, ...prev.slice(0, 4)]);
    }
  };

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

  const MiniChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    return (
      <div className="flex items-end space-x-1 h-8">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min || 1)) * 100;
          return (
            <div
              key={index}
              className="bg-primary/20 rounded-sm w-2"
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  const InteractiveChart = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-2 text-xs font-medium text-slate-500">
          {chartData.labels.map(label => (
            <div key={label} className="text-center">{label}</div>
          ))}
        </div>
        
        {chartData.datasets.map((dataset, datasetIndex) => (
          <div key={datasetIndex} className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${datasetIndex === 0 ? 'bg-primary' : 'bg-secondary'}`} />
              <span className="text-sm font-medium">{dataset.label}</span>
            </div>
            <div className="grid grid-cols-7 gap-2 h-20">
              {dataset.data.map((value, index) => {
                const maxValue = Math.max(...dataset.data);
                const height = (value / maxValue) * 100;
                return (
                  <div key={index} className="flex flex-col justify-end">
                    <div
                      className={`rounded-t-sm transition-all hover:opacity-80 cursor-pointer ${
                        datasetIndex === 0 ? 'bg-primary' : 'bg-secondary'
                      }`}
                      style={{ height: `${height}%` }}
                      title={`${dataset.label}: ${value}`}
                    />
                    <div className="text-xs text-center mt-1 text-slate-600">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
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
            {/* Notifications */}
            <div className="relative">
              <Button variant="outline" size="sm">
                <Icon name="Bell" className="h-4 w-4 mr-2" />
                Уведомления
                {notifications.length > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1 min-w-[1.25rem] h-5">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
              
              {/* Notification dropdown */}
              {notifications.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                  <div className="p-3 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-900">Уведомления</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 border-b border-slate-100 hover:bg-slate-50">
                        <div className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900">{notification.title}</h4>
                            <p className="text-sm text-slate-600">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
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
              {/* Stats Cards with Mini Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                          <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                          <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Icon name={stat.icon} className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <MiniChart data={stat.trend} />
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
                      {recentRequests.slice(0, 5).map((request) => (
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
                  
                  {/* Create Request Modal */}
                  <Dialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Icon name="Plus" className="h-4 w-4 mr-2" />
                        Создать заявку
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Создать новую заявку</DialogTitle>
                        <DialogDescription>
                          Заполните информацию о новой заявке для обработки
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Название
                          </Label>
                          <Input
                            id="title"
                            value={newRequest.title}
                            onChange={(e) => setNewRequest(prev => ({...prev, title: e.target.value}))}
                            className="col-span-3"
                            placeholder="Название заявки"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="client" className="text-right">
                            Клиент
                          </Label>
                          <Input
                            id="client"
                            value={newRequest.client}
                            onChange={(e) => setNewRequest(prev => ({...prev, client: e.target.value}))}
                            className="col-span-3"
                            placeholder="Название компании"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="executor" className="text-right">
                            Исполнитель
                          </Label>
                          <Select 
                            value={newRequest.executor}
                            onValueChange={(value) => setNewRequest(prev => ({...prev, executor: value}))}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Выберите исполнителя" />
                            </SelectTrigger>
                            <SelectContent>
                              {executors.map((executor) => (
                                <SelectItem key={executor.name} value={executor.name}>
                                  {executor.name} - {executor.role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority" className="text-right">
                            Приоритет
                          </Label>
                          <Select 
                            value={newRequest.priority}
                            onValueChange={(value) => setNewRequest(prev => ({...prev, priority: value}))}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Низкий">Низкий</SelectItem>
                              <SelectItem value="Средний">Средний</SelectItem>
                              <SelectItem value="Высокий">Высокий</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="deadline" className="text-right">
                            Дедлайн
                          </Label>
                          <Input
                            id="deadline"
                            type="date"
                            value={newRequest.deadline}
                            onChange={(e) => setNewRequest(prev => ({...prev, deadline: e.target.value}))}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right">
                            Описание
                          </Label>
                          <Textarea
                            id="description"
                            value={newRequest.description}
                            onChange={(e) => setNewRequest(prev => ({...prev, description: e.target.value}))}
                            className="col-span-3"
                            placeholder="Подробное описание заявки"
                            rows={4}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateRequestOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={handleCreateRequest}>
                          Создать заявку
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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

            {/* Reports Tab with Interactive Charts */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Отчеты и аналитика</h2>
                <Button>
                  <Icon name="Download" className="h-4 w-4 mr-2" />
                  Экспорт данных
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Интерактивная статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveChart />
                  </CardContent>
                </Card>

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

                <Card>
                  <CardHeader>
                    <CardTitle>Тренды по месяцам</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-6 gap-4 text-xs text-slate-500">
                        {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'].map(month => (
                          <div key={month} className="text-center">{month}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-6 gap-4 h-32">
                        {[65, 78, 82, 91, 89, 95].map((value, index) => (
                          <div key={index} className="flex flex-col justify-end">
                            <div
                              className="bg-gradient-to-t from-primary to-primary/50 rounded-t-sm hover:opacity-80 cursor-pointer transition-all"
                              style={{ height: `${value}%` }}
                              title={`${value}% выполнения`}
                            />
                            <div className="text-xs text-center mt-2 text-slate-600">{value}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs remain the same */}
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
                <Dialog open={isCreateMeetingOpen} onOpenChange={setIsCreateMeetingOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="h-4 w-4 mr-2" />
                      Запланировать встречу
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Запланировать встречу</DialogTitle>
                      <DialogDescription>
                        Создайте новую встречу в календаре
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meeting-title" className="text-right">
                          Название
                        </Label>
                        <Input id="meeting-title" className="col-span-3" placeholder="Название встречи" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meeting-time" className="text-right">
                          Время
                        </Label>
                        <Input id="meeting-time" type="time" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="meeting-date" className="text-right">
                          Дата
                        </Label>
                        <Input id="meeting-date" type="date" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsCreateMeetingOpen(false)}>
                        Отмена
                      </Button>
                      <Button onClick={() => setIsCreateMeetingOpen(false)}>
                        Создать встречу
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CRMDashboard;
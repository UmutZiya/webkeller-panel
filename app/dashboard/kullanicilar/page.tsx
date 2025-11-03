'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Users } from 'lucide-react';

const availableMenus = [
  { id: 'dashboard', label: 'Ana Sayfa' },
  { id: 'isletmem', label: 'İşletmem' },
  { id: 'hizmetler', label: 'Hizmetler' },
  { id: 'personel', label: 'Personel' },
  { id: 'kasa', label: 'Kasa' },
  { id: 'kasa-raporu', label: 'Kasa Raporu' },
  { id: 'musteriler', label: 'Müşteriler' },
  { id: 'randevu', label: 'Randevu' },
  { id: 'kullanicilar', label: 'Kullanıcılar' },
  // Websitem Menüsü
  { id: 'websitem', label: 'Websitem (Ana Menü)' },
  { id: 'websitem-icerik', label: 'Websitem' },
  { id: 'temalarim', label: 'Temalarım' },
  { id: 'websitem-ayarlar', label: 'Ayarlar' }
];

export default function KullanıcılarPage() {
  const { users, roles, addUser, updateUser, deleteUser, addRole } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [roleName, setRoleName] = useState('');
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  
  // Edit state
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRoleId, setEditRoleId] = useState<string>('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const canSubmit = useMemo(() => Boolean(firstName && lastName && username && password), [firstName, lastName, username, password]);
  const canSubmitRole = useMemo(() => Boolean(roleName && selectedMenus.length > 0), [roleName, selectedMenus]);

  const onAddUser = async () => {
    setMessage('');
    const ok = await addUser({ firstName, lastName, username, password, roleId: selectedRoleId || undefined } as any);
    if (!ok) {
      setMessage('Kullanıcı eklenemedi.');
      return;
    }
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setSelectedRoleId('');
    setMessage('Kullanıcı eklendi.');
  };

  const onAddRole = async () => {
    setMessage('');
    const ok = await addRole({ name: roleName, allowedMenus: selectedMenus });
    if (!ok) {
      setMessage('Rol eklenemedi.');
      return;
    }
    setRoleName('');
    setSelectedMenus([]);
    setMessage('Rol eklendi.');
  };

  const openEditDialog = (user: any) => {
    setEditingUser(user);
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
    setEditUsername(user.username);
    setEditPassword('');
    setEditRoleId(user.roleId || '');
    setEditDialogOpen(true);
  };

  const onUpdateUser = async () => {
    if (!editingUser) return;
    setMessage('');
    const updateData: any = {
      firstName: editFirstName,
      lastName: editLastName,
      username: editUsername,
      roleId: editRoleId || null
    };
    if (editPassword) {
      updateData.password = editPassword;
    }
    const ok = await updateUser(editingUser.id, updateData);
    if (!ok) {
      setMessage('Kullanıcı güncellenemedi.');
      return;
    }
    setEditDialogOpen(false);
    setEditingUser(null);
    setMessage('Kullanıcı güncellendi.');
  };

  const onDeleteUser = async (userId: string) => {
    setMessage('');
    const ok = await deleteUser(userId);
    if (!ok) {
      setMessage('Kullanıcı silinemedi.');
      return;
    }
    setMessage('Kullanıcı silindi.');
  };

  const toggleMenu = (menuId: string) => {
    setSelectedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  // removed role creation handler

  // removed roles fetch

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600 dark:text-gray-300">Sistem kullanıcılarını ve rollerini yönetin</p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Kullanıcı Listesi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200 dark:border-gray-700">
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Ad</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Soyad</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Kullanıcı Adı</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">Rol</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300 font-semibold">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(u => (
                      <TableRow key={u.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border-b border-gray-100 dark:border-gray-700">
                        <TableCell className="text-gray-900 dark:text-gray-100 font-medium">{u.firstName}</TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100 font-medium">{u.lastName}</TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">{u.username}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.role?.name ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                          }`}>
                            {u.role?.name || 'Rol Yok'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(u)}
                              className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:border-blue-700 dark:text-blue-400 transition-all duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:border-red-700 dark:text-red-400 transition-all duration-200" variant="outline">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-gray-900 dark:text-white">Kullanıcıyı Sil</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                                    {u.firstName} {u.lastName} kullanıcısını silmek istediğinizden emin misiniz?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300">İptal</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => onDeleteUser(u.id)} className="bg-red-600 hover:bg-red-700 text-white">
                                    Sil
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <Edit className="w-6 h-6 text-gray-400" />
                            </div>
                            Henüz kullanıcı bulunamadı
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Yeni Kullanıcı Ekle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad</label>
                    <Input 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                      className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soyad</label>
                    <Input 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                      className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kullanıcı Adı</label>
                    <Input 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Şifre</label>
                    <Input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol</label>
                    <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                      <SelectTrigger className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                        <SelectValue placeholder="Rol seçin" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                        {roles.map(role => (
                          <SelectItem key={role.id} value={role.id} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700">{role.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg" 
                  onClick={onAddUser} 
                  disabled={!canSubmit}
                >
                  Kullanıcı Ekle
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Yeni Rol Ekle
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol Adı</label>
                    <Input 
                      value={roleName} 
                      onChange={(e) => setRoleName(e.target.value)} 
                      className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">İzinli Menüler</label>
                    <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      {availableMenus.map(menu => (
                        <div key={menu.id} className="flex items-center space-x-3 p-2 rounded hover:bg-white dark:hover:bg-slate-600 transition-colors">
                          <Checkbox 
                            id={menu.id}
                            checked={selectedMenus.includes(menu.id)}
                            onCheckedChange={() => toggleMenu(menu.id)}
                            className="border-gray-300 dark:border-gray-500 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                          />
                          <label htmlFor={menu.id} className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{menu.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg" 
                  onClick={onAddRole} 
                  disabled={!canSubmitRole}
                >
                  Rol Ekle
                </Button>
              </CardContent>
            </Card>

            {message && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-sm text-blue-700 dark:text-blue-300 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700 max-w-2xl">
          <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Kullanıcı Düzenle
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ad</label>
              <Input 
                value={editFirstName} 
                onChange={(e) => setEditFirstName(e.target.value)} 
                className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Soyad</label>
              <Input 
                value={editLastName} 
                onChange={(e) => setEditLastName(e.target.value)} 
                className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kullanıcı Adı</label>
              <Input 
                value={editUsername} 
                onChange={(e) => setEditUsername(e.target.value)} 
                className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Yeni Şifre</label>
              <Input 
                type="password" 
                value={editPassword} 
                onChange={(e) => setEditPassword(e.target.value)} 
                placeholder="Boş bırakın değiştirmek istemiyorsanız"
                className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rol</label>
              <Select value={editRoleId} onValueChange={setEditRoleId}>
                <SelectTrigger className="bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue placeholder="Rol seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700">
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700">{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              variant="outline" 
              onClick={() => setEditDialogOpen(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600"
            >
              İptal
            </Button>
            <Button 
              onClick={onUpdateUser}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 shadow-lg"
            >
              Güncelle
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}



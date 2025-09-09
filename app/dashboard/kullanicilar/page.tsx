'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function KullanıcılarPage() {
  const { users, roles, addUser, addRole } = useApp();
  const [roleOptions, setRoleOptions] = useState<string[]>(roles);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');
  const [newRole, setNewRole] = useState('');
  const [message, setMessage] = useState<string>('');

  const canSubmit = useMemo(() => firstName && lastName && username && password && role, [firstName, lastName, username, password, role]);

  const onAddUser = () => {
    setMessage('');
    const ok = addUser({ firstName, lastName, username, password, role });
    if (!ok) {
      setMessage('Kullanıcı adı zaten mevcut.');
      return;
    }
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    setRole('');
    setMessage('Kullanıcı eklendi.');
  };

  const onAddRole = async () => {
    setMessage('');
    const ok = await addRole(newRole);
    if (!ok) {
      setMessage('Rol eklenemedi. Zaten mevcut veya geçersiz.');
      return;
    }
    setNewRole('');
    setMessage('Rol eklendi.');
    // refresh roles
    try {
      const res = await fetch('/api/roles');
      const list = await res.json();
      setRoleOptions(list.map((r: any) => r.name));
    } catch {}
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/roles');
        const list = await res.json();
        setRoleOptions(list.map((r: any) => r.name));
      } catch {}
    })();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad</TableHead>
                  <TableHead>Soyad</TableHead>
                  <TableHead>Kullanıcı Adı</TableHead>
                  <TableHead>Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.role}</TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-sm text-gray-500">Kullanıcı bulunamadı.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Yeni Kullanıcı Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Ad</label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-1">Soyad</label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-1">Kullanıcı Adı</label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-1">Şifre</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Rol</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="mt-4" onClick={onAddUser} disabled={!canSubmit}>Kullanıcı Ekle</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yeni Rol Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Rol adı (ör. Depo)" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
              <Button onClick={onAddRole}>Ekle</Button>
            </div>
            {message && <div className="text-sm text-gray-600 mt-3">{message}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// removed role select imports
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function KullanıcılarPage() {
  const { users, addUser } = useApp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // removed role state
  const [message, setMessage] = useState<string>('');

  const canSubmit = useMemo(() => Boolean(firstName && lastName && username && password), [firstName, lastName, username, password]);

  const onAddUser = () => {
    setMessage('');
    const ok = addUser({ firstName, lastName, username, password } as any);
    if (!ok) {
      setMessage('Kullanıcı adı zaten mevcut.');
      return;
    }
    setFirstName('');
    setLastName('');
    setUsername('');
    setPassword('');
    // role removed
    setMessage('Kullanıcı eklendi.');
  };

  // removed role creation handler

  // removed roles fetch

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
                  {/* role column removed */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id}>
                    <TableCell>{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    {/* role cell removed */}
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-sm text-gray-500">Kullanıcı bulunamadı.</TableCell>
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
              {/* role selection removed */}
            </div>
            <Button className="mt-4" onClick={onAddUser} disabled={!canSubmit}>Kullanıcı Ekle</Button>
          </CardContent>
        </Card>

        {/* role creation card removed */}
      </div>
    </div>
  );
}



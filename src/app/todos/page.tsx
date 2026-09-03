import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ListTodo, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch todos from Supabase
  const { data: todos, error } = await supabase.from('todos').select();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Card className="border-border/60 shadow-xl overflow-hidden backdrop-blur-md bg-card/70">
          <CardHeader className="border-b border-border/40 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <ListTodo className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-serif">Supabase Todos</CardTitle>
                  <CardDescription>Direct real-time query test page</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex gap-3 items-start mb-6">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Query Error</p>
                  <p className="text-xs opacity-90">{error.message}</p>
                  <p className="text-[10px] mt-2 opacity-80 font-mono">
                    Ensure the &apos;todos&apos; table exists in Supabase and has &apos;id&apos; (int/uuid) and &apos;name&apos; (text) columns.
                  </p>
                </div>
              </div>
            )}

            {!todos || todos.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-border/80 rounded-2xl bg-muted/20">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <h3 className="font-semibold text-base mb-1">No todos found</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                  Successfully connected to Supabase, but the &apos;todos&apos; table is empty. Add some entries in your Supabase dashboard!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                  Fetched {todos.length} items from Supabase:
                </p>
                <ul className="grid gap-3">
                  {todos.map((todo) => (
                    <li 
                      key={todo.id} 
                      className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/20 hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-sm font-medium">{todo.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground opacity-60">ID: {todo.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

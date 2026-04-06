import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Loader2, Lock, LogOut, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetContactSubmissions, useIsAdmin } from "../hooks/useQueries";

interface AdminDashboardProps {
  onBack: () => void;
}

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsAdmin();
  const { data: submissions = [], isLoading: loadingSubmissions } =
    useGetContactSubmissions();
  const [activeTab, setActiveTab] = useState<"submissions">("submissions");

  const handleLogin = async () => {
    try {
      await login();
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    clear();
    toast.success("Logged out successfully.");
  };

  const formatDate = (timestamp: bigint) => {
    const ms = Number(timestamp) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-500/40">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBack}
                data-ocid="admin.back.secondary_button"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Site
              </button>
              <div className="h-4 w-px bg-charcoal-500/50" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-gold" />
                <span className="font-display text-sm font-semibold text-foreground tracking-wide">
                  Admin Dashboard
                </span>
              </div>
            </div>

            {isLoggedIn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                data-ocid="admin.logout.button"
                className="text-muted-foreground hover:text-copper gap-2"
              >
                <LogOut size={14} />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container-wide py-12">
        {isInitializing ? (
          <div
            data-ocid="admin.loading_state"
            className="flex items-center justify-center py-24"
          >
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : !isLoggedIn ? (
          /* Login Prompt */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto text-center py-20"
            data-ocid="admin.login.panel"
          >
            <div className="w-16 h-16 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-gold" />
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-3 uppercase tracking-wide">
              Admin Access
            </h2>
            <p className="font-body text-muted-foreground mb-8">
              Sign in with Internet Identity to access the admin dashboard and
              view contact form submissions.
            </p>
            <Button
              onClick={handleLogin}
              disabled={loginStatus === "logging-in"}
              data-ocid="admin.login.primary_button"
              className="bg-copper hover:bg-copper/90 text-white uppercase tracking-widest text-sm font-semibold px-8 py-3 rounded-sm w-full"
            >
              {loginStatus === "logging-in" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        ) : isCheckingAdmin ? (
          <div
            data-ocid="admin.checking.loading_state"
            className="flex items-center justify-center py-24"
          >
            <Loader2 className="animate-spin text-gold" size={32} />
          </div>
        ) : !isAdmin ? (
          /* Not Admin */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
            data-ocid="admin.not_authorized.panel"
          >
            <div className="w-16 h-16 rounded-sm bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-destructive" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Access Restricted
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              Your account does not have admin privileges. Please contact the
              site administrator.
            </p>
            <p className="font-body text-xs text-muted-foreground/60 mb-6 break-all">
              Principal: {identity?.getPrincipal().toString()}
            </p>
            <Button
              variant="outline"
              onClick={handleLogout}
              data-ocid="admin.not_authorized_logout.button"
              className="border-charcoal-500/50 text-muted-foreground"
            >
              Sign Out
            </Button>
          </motion.div>
        ) : (
          /* Admin Content */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Welcome bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-1 uppercase tracking-wide">
                  Dashboard
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                  Principal: {identity?.getPrincipal().toString().slice(0, 20)}
                  ...
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-gold/50 text-gold font-body text-xs uppercase tracking-wider"
              >
                Administrator
              </Badge>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-dark-card border border-charcoal-500/30 rounded-sm p-5">
                <div className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Total Inquiries
                </div>
                <div className="font-display text-3xl font-bold text-gold">
                  {submissions.length}
                </div>
              </div>
              <div className="bg-dark-card border border-charcoal-500/30 rounded-sm p-5">
                <div className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  This Month
                </div>
                <div className="font-display text-3xl font-bold text-foreground">
                  {
                    submissions.filter((s) => {
                      const ms = Number(s.timestamp) / 1_000_000;
                      const d = new Date(ms);
                      const now = new Date();
                      return (
                        d.getMonth() === now.getMonth() &&
                        d.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </div>
              </div>
              <div className="bg-dark-card border border-charcoal-500/30 rounded-sm p-5">
                <div className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Restaurants
                </div>
                <div className="font-display text-3xl font-bold text-foreground">
                  {new Set(submissions.map((s) => s.restaurantName)).size}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-charcoal-500/30 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("submissions")}
                data-ocid="admin.submissions.tab"
                className={`font-body text-sm uppercase tracking-wider pb-3 px-1 border-b-2 transition-colors ${
                  activeTab === "submissions"
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Contact Submissions
              </button>
            </div>

            {/* Submissions Table */}
            {loadingSubmissions ? (
              <div
                data-ocid="admin.submissions.loading_state"
                className="flex items-center justify-center py-12"
              >
                <Loader2 className="animate-spin text-gold" size={24} />
              </div>
            ) : submissions.length === 0 ? (
              <div
                data-ocid="admin.submissions.empty_state"
                className="text-center py-16 bg-dark-card border border-charcoal-500/30 rounded-sm"
              >
                <p className="font-body text-muted-foreground">
                  No contact submissions yet.
                </p>
              </div>
            ) : (
              <div
                className="bg-dark-card border border-charcoal-500/30 rounded-sm overflow-hidden"
                data-ocid="admin.submissions.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-charcoal-500/30 hover:bg-transparent">
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        #
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Name
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Restaurant
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Email
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Website
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Message
                      </TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((sub, i) => (
                      <TableRow
                        // biome-ignore lint/suspicious/noArrayIndexKey: submissions list
                        key={i}
                        data-ocid={`admin.submissions.row.${i + 1}`}
                        className="border-charcoal-500/20 hover:bg-charcoal-700/30 transition-colors"
                      >
                        <TableCell className="font-body text-xs text-muted-foreground">
                          {i + 1}
                        </TableCell>
                        <TableCell className="font-body text-sm text-foreground font-medium">
                          {sub.name}
                        </TableCell>
                        <TableCell className="font-body text-sm text-gold">
                          {sub.restaurantName}
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground">
                          <a
                            href={`mailto:${sub.email}`}
                            className="hover:text-gold transition-colors"
                          >
                            {sub.email}
                          </a>
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground">
                          {sub.website ? (
                            <a
                              href={sub.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-gold transition-colors truncate max-w-[120px] block"
                            >
                              {sub.website}
                            </a>
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground max-w-[200px]">
                          <p className="truncate" title={sub.message}>
                            {sub.message}
                          </p>
                        </TableCell>
                        <TableCell className="font-body text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(sub.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}

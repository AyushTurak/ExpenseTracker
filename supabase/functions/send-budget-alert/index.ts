import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

interface BudgetAlertPayload {
  user_id: string;
  user_email: string;
  monthly_budget: number;
  current_expenses: number;
  threshold_percentage: number;
  percentage_used: number;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const payload: BudgetAlertPayload = await req.json();

    const { user_id, user_email, monthly_budget, current_expenses, threshold_percentage, percentage_used } = payload;

    if (!user_email || !monthly_budget || current_expenses === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Budget Alert Notification</h2>
      <p>Hi,</p>
      <p>Your expenses have reached <strong>${percentage_used.toFixed(1)}%</strong> of your monthly budget.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Monthly Budget:</strong> $${monthly_budget.toFixed(2)}</p>
        <p><strong>Current Expenses:</strong> $${current_expenses.toFixed(2)}</p>
        <p><strong>Remaining Budget:</strong> $${(monthly_budget - current_expenses).toFixed(2)}</p>
        <p><strong>Alert Threshold:</strong> ${threshold_percentage}%</p>
      </div>
      
      <p>Please review your spending to ensure it stays within your budget.</p>
      <p style="color: #666; font-size: 12px; margin-top: 30px;">This is an automated alert from your Expense Tracker.</p>
    </div>
    `;

    // Save notification to database
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id,
        type: "budget_alert",
        title: "Budget Alert",
        message: `Your expenses have reached ${percentage_used.toFixed(1)}% of your monthly budget.`,
        email_sent: true,
      });

    if (notificationError) {
      console.error("Error saving notification:", notificationError);
    }

    // Update last_notified_at
    const { error: updateError } = await supabase
      .from("budget_alerts")
      .update({ last_notified_at: new Date().toISOString() })
      .eq("user_id", user_id);

    if (updateError) {
      console.error("Error updating last_notified_at:", updateError);
    }

    // Send email via Resend API
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (resendApiKey) {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@expensetracker.app",
          to: user_email,
          subject: "Budget Alert: Your spending is increasing",
          html: emailContent,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.text();
        console.error("Email sending failed:", errorData);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Budget alert sent successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-budget-alert function:", error);

    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

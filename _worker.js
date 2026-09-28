export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    console.log(`========== ဝင်လာသော Request အသစ် ==========`);
    console.log(`Method: ${method}`);
    console.log(`Path: ${url.pathname}`);

    // ၁။ GET Parameters (Query String) များကို ဖမ်းယူခြင်း
    const queryParams = Object.fromEntries(url.searchParams);
    if (Object.keys(queryParams).length > 0) {
      console.log(`GET Parameters (Query):`, JSON.stringify(queryParams, null, 2));
    } else {
      console.log(`GET Parameters: မရှိပါ`);
    }

    // ၂။ POST/PUT Parameters (Body Data) များကို ဖမ်းယူခြင်း
    if (method !== "GET" && method !== "HEAD") {
      const contentType = request.headers.get("content-type") || "";
      
      try {
        if (contentType.includes("application/json")) {
          // JSON format ဖြင့် ပို့လိုက်သော data
          const jsonBody = await request.json();
          console.log(`POST Parameters (JSON Body):`, JSON.stringify(jsonBody, null, 2));
          
        } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
          // Form data ဖြင့် ပို့လိုက်သော data
          const formData = await request.formData();
          const formParams = Object.fromEntries(formData);
          console.log(`POST Parameters (Form Data):`, JSON.stringify(formParams, null, 2));
          
        } else {
          // အခြား Raw text format များ
          const textBody = await request.text();
          console.log(`Raw Body:`, textBody);
        }
      } catch (error) {
        console.error("Body data ဖတ်ရာတွင် အမှားအယွင်းဖြစ်နေပါသည်:", error.message);
      }
    }

    console.log(`===========================================\n`);

    // Client ဘက်သို့ အောင်မြင်ကြောင်း Response ပြန်ပေးခြင်း
    return new Response(JSON.stringify({ message: "Logs successfully recorded." }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

# cPanel Deployment (টার্মিনাল ছাড়াই)

এই প্রজেক্টে এখন GitHub Actions অটো-ভাবে `website-ready.zip` বানাবে।
তোমার কাজ শুধু ZIP ডাউনলোড করে cPanel File Manager-এ আপলোড করা।

## প্রথমবার (একবারই করতে হবে)

1. Lovable Project Settings → **GitHub** → **Connect**
2. GitHub App authorization complete করো (এটাই সবচেয়ে জরুরি)
3. Repo তৈরি/কানেক্ট করো

> যদি GitHub কানেক্টেড না থাকে, ZIP build হবে না।

## কিভাবে ZIP বানাবে (টার্মিনাল ছাড়াই)

1. GitHub repo ওপেন করো
2. উপরে **Actions** ট্যাব এ যাও
3. **Build cPanel ZIP (No Terminal)** workflow সিলেক্ট করো
4. **Run workflow** ক্লিক করো
5. 1-3 মিনিট অপেক্ষা করো
6. Run complete হলে নিচে **Artifacts** সেকশনে `website-ready` দেখাবে
7. `website-ready` ডাউনলোড করো → ভিতরে `website-ready.zip` পাবে

## cPanel-এ আপলোড

1. cPanel → **File Manager**
2. `public_html` ওপেন করো
3. পুরনো ফাইল থাকলে select করে delete (optional but cleaner)
4. `website-ready.zip` আপলোড করো
5. Upload শেষে zip এর উপর right click → **Extract**
6. নিশ্চিত হও ফাইলগুলো সরাসরি `public_html`-এ আছে (কোন extra nested folder না)

## আপডেট দেওয়ার নিয়ম (প্রতি বার)

1. Lovable-এ edit করো
2. Change GitHub এ auto sync হবে
3. GitHub Actions থেকে আবার **Run workflow**
4. নতুন `website-ready` artifact ডাউনলোড
5. cPanel-এ upload + extract + overwrite

## যদি error আসে: "installation not found"

এটার মানে GitHub connection/auth ভেঙে গেছে। Fix:

1. Lovable → Settings → GitHub
2. Disconnect (যদি থাকে)
3. আবার Connect
4. GitHub App permissions Allow করে দাও
5. আবার workflow run করো

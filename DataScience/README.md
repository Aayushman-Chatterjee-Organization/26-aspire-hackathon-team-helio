# SMATCH

An Agentic AI solution leveraging Bodhi, Slingshot and other AI services to bridge the matching gap between candidates and available roles in PS. This solution uses CrewAI, AskBodhi, OpenAI sdk and other tools in its stack.

# Deploy

gcloud run deploy hackathon-26-ml \
 --source . \
 --base-image=python311 \
 --platform managed \
 --region us-central1 \
 --memory=2Gi \
 --cpu=1 \
 --concurrency=4 \
 --min-instances=0 \
 --max-instances=5 \
 --port=8080 \
 --timeout=60 \
 --automatic-updates \
 --quiet \
 --set-env-vars="BODHI_API_KEY=<placeholder>,ASK_BODHI_API_URL=https://askbodhi-backend-api.dev.psbodhi.live,BODHI_LLM_GATEWAY_URL=https://bodhi-llm-gateway.dev.psbodhi.live,DEFAULT_COLLECTION_NAME=helio"

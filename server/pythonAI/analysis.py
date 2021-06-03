from fastai.vision.all import *
from fastai.vision.widgets import*
from io import BytesIO

import json

#path = Path()
learn_inf = load_learner(sys.argv[1], cpu=True)
btn_upload = widgets.FileUpload()
lbl_pred = widgets.Label()

def on_click():
    with open(sys.argv[2], "rb") as image:
    	f= image.read()
    	img = PILImage.create(BytesIO(bytearray(f)))
    	
    	pred, pred_idx, probs = learn_inf.predict(img)
    	
    	top3_conf, i = probs.topk(3)
    	
    	itr = 0
    	
    	classes = learn_inf.dls.vocab
    	
    	res = []
    	
    	for x in i:
    		res.append({
    		'residuID' : classes[x.item()],
    		'prob': top3_conf[itr].item()})
    		#print(classes[x.item()], top3_conf[itr].item())
    		itr = itr + 1
    		
    	print(json.dumps(res,ensure_ascii=False))
    	#pred, pred_idx, probs = learn_inf.predict(img)
    	#lbl_pred.value = f'Prediction: {pred}; Probability: {probs[pred_idx]:.04f}'
    	#print(lbl_pred.value)
 
on_click()


#!/bin/bash

################### ローカル環境にシークレット変数を設定するために実施 ###################

# 読み込み元シークレットファイルを設定
SECRETFILE="secrets.yml"

# yqがインストールされていることを確認
if ! command -v yq &> /dev/null; then
    echo "yq could not be found, please install it."
    exit 1
fi

# secrets.ymlからシークレット変数を1行ずつ読み込む
yq eval 'keys | .[]' "$SECRETFILE" | while read -r SECRET; do
    VALUE=$(yq eval ".$SECRET" "$SECRETFILE")
    export "$SECRET"="$VALUE"
    echo "Exported $SECRET with value $VALUE"
done

echo "All secret variables have been exported to the local environment."
